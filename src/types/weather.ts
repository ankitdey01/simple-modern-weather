export interface WeatherData {
  location: LocationData;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface LocationData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  condition: WeatherCondition;
  description: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  airQuality: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: WeatherCondition;
  pop?: number;
}

export interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  pop?: number;
}

export type WeatherCondition = 
  | 'clear' 
  | 'cloudy' 
  | 'partly-cloudy' 
  | 'rain' 
  | 'snow' 
  | 'thunderstorm' 
  | 'fog' 
  | 'drizzle';

export interface SearchResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface UVIndexLevel {
  value: number;
  label: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  color: string;
}

export interface AirQualityLevel {
  value: number;
  label: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
}
