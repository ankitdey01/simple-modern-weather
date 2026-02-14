import { useState, useEffect, useCallback } from 'react';
import type { WeatherData, LocationData, SearchResult } from '@/types/weather';
import { 
  getWeatherByCoords, 
  searchLocations, 
  getCurrentLocation 
} from '@/services/weatherApi';

const STORAGE_KEY = 'weather_app_last_location';

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  selectLocation: (location: SearchResult) => Promise<void>;
  useCurrentLocation: () => Promise<void>;
  refreshWeather: () => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  // Load saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem(STORAGE_KEY);
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation) as LocationData;
        setCurrentLocation(parsed);
        fetchWeather(parsed.lat, parsed.lon, parsed);
      } catch {
        // If parsing fails, use default location
        loadDefaultLocation();
      }
    } else {
      loadDefaultLocation();
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchLocations(searchQuery);
        console.log('🔍 Search results for "', searchQuery, '":', results);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadDefaultLocation = async () => {
    // Default to San Francisco
    const defaultLocation: LocationData = {
      name: 'San Francisco',
      state: 'CA',
      country: 'US',
      lat: 37.7749,
      lon: -122.4194,
    };
    setCurrentLocation(defaultLocation);
    await fetchWeather(defaultLocation.lat, defaultLocation.lon, defaultLocation);
  };

  const fetchWeather = async (lat: number, lon: number, locationData?: LocationData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCoords(lat, lon);
      console.log('🌤️ Fetched weather data:', data);
      if (data) {
        // Override location if we have better data
        if (locationData) {
          data.location = locationData;
        }
        setWeather(data);
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.location));
        setCurrentLocation(data.location);
      } else {
        setError('Failed to load weather data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectLocation = useCallback(async (location: SearchResult) => {
    setSearchQuery('');
    setSearchResults([]);
    
    const locationData: LocationData = {
      name: location.name,
      state: location.state,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    };
    
    await fetchWeather(location.lat, location.lon, locationData);
  }, []);

  const useCurrentLocationCallback = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      await fetchWeather(latitude, longitude);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not get your location');
      setLoading(false);
    }
  }, []);

  const refreshWeather = useCallback(async () => {
    if (currentLocation) {
      await fetchWeather(currentLocation.lat, currentLocation.lon, currentLocation);
    }
  }, [currentLocation]);

  return {
    weather,
    loading,
    error,
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    selectLocation,
    useCurrentLocation: useCurrentLocationCallback,
    refreshWeather,
  };
};
