import type { WeatherData, SearchResult, WeatherCondition, HourlyForecast } from '@/types/weather';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1';

const mapWeatherCondition = (weatherCode: number): WeatherCondition => {
  // Open-Meteo uses WMO weather codes
  if (weatherCode === 0) return 'clear';
  if (weatherCode >= 1 && weatherCode <= 3) return 'partly-cloudy';
  if (weatherCode >= 45 && weatherCode <= 48) return 'fog';
  if (weatherCode >= 51 && weatherCode <= 55) return 'drizzle';
  if (weatherCode >= 56 && weatherCode <= 57) return 'drizzle';
  if (weatherCode >= 61 && weatherCode <= 65) return 'rain';
  if (weatherCode >= 66 && weatherCode <= 67) return 'rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'snow';
  if (weatherCode >= 80 && weatherCode <= 82) return 'rain';
  if (weatherCode >= 85 && weatherCode <= 86) return 'snow';
  if (weatherCode >= 95 && weatherCode <= 99) return 'thunderstorm';
  return 'clear';
};

const getWeatherDescription = (weatherCode: number): string => {
  // Open-Meteo WMO weather code descriptions
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm',
  };
  return descriptions[weatherCode] || 'Unknown';
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
};

export const searchLocations = async (query: string): Promise<SearchResult[]> => {
  console.log(`🔍 Searching locations for query: "${query}"`);

  console.log('📍 Making geocoding API request...');

  try {
    const response = await fetch(
      `${GEOCODING_API_URL}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    
    if (!response.ok) throw new Error('Failed to fetch locations');
    
    const data = await response.json();
    console.log('📍 Geocoding API response:', data);
    
    if (!data.results || !Array.isArray(data.results)) {
      console.log('⚠️ No results found from geocoding API');
      return [];
    }
    
    return data.results.map((item: any) => ({
      name: item.name,
      state: item.admin1 || '',
      country: item.country_code || item.country || '',
      lat: item.latitude,
      lon: item.longitude,
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
  console.log(`🎯 Fetching weather for coordinates: lat=${lat}, lon=${lon}`);

  console.log('🌡️ Making weather API request...');

  try {
    // Build Open-Meteo API URL with all required parameters
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,uv_index',
      hourly: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,uv_index',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
      timezone: 'auto',
      forecast_days: '7',
      wind_speed_unit: 'kmh',
      temperature_unit: 'celsius',
      precipitation_unit: 'mm',
    });

    const response = await fetch(`${WEATHER_API_URL}/forecast?${params}`);
    
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json();
    console.log('🌡️ Open-Meteo API response:', data);

    if (!data || !data.current) {
      console.log('⚠️ Invalid response from Open-Meteo API');
      throw new Error('Failed to fetch weather data');
    }

    // Get location name from reverse geocoding
    let locationName = 'Your Location';
    let state = '';
    let country = '';
    
    try {
      const geoResponse = await fetch(
        `${GEOCODING_API_URL}/reverse?latitude=${lat}&longitude=${lon}&count=1&format=json`
      );
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        console.log('🗺️ Reverse geocoding response:', geoData);
        if (geoData.results && geoData.results.length > 0) {
          const location = geoData.results[0];
          const resolvedName = location.name || location.admin1 || 'Unknown';
          locationName = resolvedName === 'Unknown' ? 'Your Location' : resolvedName;
          state = location.admin1 || '';
          country = location.country_code || location.country || '';
        }
      }
    } catch (geoError) {
      console.warn('Failed to get location name:', geoError);
    }

    // Process hourly forecast (next 24 hours)
    const hourly: HourlyForecast[] = [];
    const now = new Date();
    let nowUsed = false;
    
    for (let i = 0; i < Math.min(24, data.hourly.time.length); i++) {
      const hourTime = new Date(data.hourly.time[i]);
      const isCurrentHour = !nowUsed && Math.abs(hourTime.getTime() - now.getTime()) < 60 * 60 * 1000;
      
      if (isCurrentHour) {
        nowUsed = true;
      }
      
      hourly.push({
        time: isCurrentHour ? 'Now' : hourTime.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temp: Math.round(data.hourly.temperature_2m[i]),
        condition: mapWeatherCondition(data.hourly.weather_code[i]),
      });
    }

    // Process daily forecast
    const daily = [];
    for (let i = 0; i < Math.min(7, data.daily.time.length); i++) {
      const date = new Date(data.daily.time[i]);
      const isToday = i === 0;
      
      daily.push({
        day: isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high: Math.round(data.daily.temperature_2m_max[i]),
        low: Math.round(data.daily.temperature_2m_min[i]),
        condition: mapWeatherCondition(data.daily.weather_code[i]),
      });
    }

    // Get sunrise/sunset from Open-Meteo if available
    let sunrise = '6:42 AM';
    let sunset = '7:28 PM';
    
    if (data.daily.sunrise && data.daily.sunset) {
      const sunriseDate = new Date(data.daily.sunrise[0]);
      const sunsetDate = new Date(data.daily.sunset[0]);
      sunrise = formatTime(sunriseDate);
      sunset = formatTime(sunsetDate);
    }

    const weatherResult = {
      location: {
        name: locationName,
        state,
        country,
        lat,
        lon,
      },
      current: {
        temp: Math.round(data.current.temperature_2m),
        feels_like: Math.round(data.current.apparent_temperature),
        condition: mapWeatherCondition(data.current.weather_code),
        description: getWeatherDescription(data.current.weather_code),
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        humidity: Math.round(data.current.relative_humidity_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDeg: Math.round(data.current.wind_direction_10m),
        pressure: Math.round(data.current.pressure_msl),
        visibility: Math.round((data.current.visibility || 10) / 1609.34), // Convert meters to miles
        uvIndex: Math.round(data.current.uv_index || 0),
        airQuality: 0, // Not available in Open-Meteo free API
        sunrise,
        sunset,
      },
      hourly,
      daily,
    };
    
    console.log('✅ Final processed weather data:', weatherResult);
    return weatherResult;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};

export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000,
    });
  });
};

export const getUVIndexLevel = (uvIndex: number): { label: string; color: string } => {
  if (uvIndex <= 2) return { label: 'Low', color: '#30D158' };
  if (uvIndex <= 5) return { label: 'Moderate', color: '#FFD60A' };
  if (uvIndex <= 7) return { label: 'High', color: '#FF9F0A' };
  if (uvIndex <= 10) return { label: 'Very High', color: '#FF453A' };
  return { label: 'Extreme', color: '#AF52DE' };
};

export const getAirQualityLevel = (aqi: number): { label: string; color: string } => {
  if (aqi <= 50) return { label: 'Good', color: '#30D158' };
  if (aqi <= 100) return { label: 'Moderate', color: '#FFD60A' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: '#FF9F0A' };
  if (aqi <= 200) return { label: 'Unhealthy', color: '#FF453A' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: '#AF52DE' };
  return { label: 'Hazardous', color: '#8E4B44' };
};
