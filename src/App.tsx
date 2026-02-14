import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import { Navigation } from '@/components/weather/Navigation';
import { SearchModal } from '@/components/weather/SearchModal';
import { MainWeatherDisplay } from '@/components/weather/MainWeatherDisplay';
import { WeatherMetrics } from '@/components/weather/WeatherMetrics';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { DailyForecast } from '@/components/weather/DailyForecast';
import { LoadingSkeleton } from '@/components/weather/LoadingSkeleton';
import { ParticleBackground } from '@/components/weather/ParticleBackground';
import { Toaster, toast } from 'sonner';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  const {
    weather,
    loading,
    error,
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    selectLocation,
    useCurrentLocation,
    refreshWeather,
  } = useWeather();

  const handleUseCurrentLocation = async () => {
    setIsLocating(true);
    try {
      await useCurrentLocation();
      setIsSearchOpen(false);
      toast.success('Location updated');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not get location');
    } finally {
      setIsLocating(false);
    }
  };

  const handleSelectLocation = async (location: any) => {
    await selectLocation(location);
    setIsSearchOpen(false);
    toast.success(`Weather updated for ${location.name}`);
  };

  // Get background gradient based on weather condition
  const getBackgroundGradient = () => {
    if (!weather) return 'linear-gradient(180deg, #000000 0%, #1C1C1E 100%)';
    
    const condition = weather.current.condition;
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 20;

    if (isNight) {
      return 'linear-gradient(180deg, #000000 0%, #0A0A0F 50%, #1C1C2E 100%)';
    }

    switch (condition) {
      case 'clear':
        return 'linear-gradient(180deg, #000000 0%, #1A1508 50%, #2D2410 100%)';
      case 'partly-cloudy':
        return 'linear-gradient(180deg, #000000 0%, #1C1C1E 50%, #2C2C2E 100%)';
      case 'cloudy':
        return 'linear-gradient(180deg, #000000 0%, #1A1A1C 50%, #2A2A2C 100%)';
      case 'rain':
      case 'drizzle':
        return 'linear-gradient(180deg, #000000 0%, #0A1628 50%, #102040 100%)';
      case 'thunderstorm':
        return 'linear-gradient(180deg, #000000 0%, #0D0D1A 50%, #1A1A2E 100%)';
      case 'snow':
        return 'linear-gradient(180deg, #000000 0%, #1A1A2E 50%, #2E2E3E 100%)';
      case 'fog':
        return 'linear-gradient(180deg, #000000 0%, #1C1C20 50%, #2C2C30 100%)';
      default:
        return 'linear-gradient(180deg, #000000 0%, #1C1C1E 100%)';
    }
  };

  return (
    <div 
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1C1C1E',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />

      {/* Particle Background */}
      {weather && <ParticleBackground condition={weather.current.condition} />}

      {/* Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(10,132,255,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,69,58,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      {weather && (
        <Navigation
          locationName={weather.location.name}
          onLocationClick={() => setIsSearchOpen(true)}
        />
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-8">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF453A]/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#FF453A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
                <p className="text-white/60 text-center mb-6">{error}</p>
                <button
                  onClick={refreshWeather}
                  className="px-6 py-3 bg-[#0A84FF] rounded-xl text-white font-medium hover:bg-[#0A84FF]/80 transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : weather ? (
              <motion.div
                key="weather"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MainWeatherDisplay weather={weather.current} />
                <HourlyForecast hourly={weather.hourly} />
                <WeatherMetrics weather={weather.current} />
                <DailyForecast daily={weather.daily} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
        onSelectLocation={handleSelectLocation}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
      />

      {/* Pull to Refresh Indicator (Mobile) */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : 20 }}
      >
        <div className="px-4 py-2 bg-[#1C1C1E]/80 backdrop-blur-xl rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-4 h-4 border-2 border-[#0A84FF] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-white/70 text-sm">Updating...</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
