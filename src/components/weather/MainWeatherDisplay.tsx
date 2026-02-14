import { motion } from 'framer-motion';
import type { CurrentWeather } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MainWeatherDisplayProps {
  weather: CurrentWeather;
}

const customExpo = [0.16, 1, 0.3, 1] as const;

export const MainWeatherDisplay: React.FC<MainWeatherDisplayProps> = ({ weather }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Weather Icon */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo }}
        className="mb-4"
      >
        <WeatherIcon condition={weather.condition} size="xl" />
      </motion.div>

      {/* Condition Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.1 }}
        className="text-xl text-white/90 font-medium mb-2 capitalize"
      >
        {weather.description}
      </motion.p>

      {/* Main Temperature */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: customExpo, delay: 0.2 }}
        style={{ perspective: 1000 }}
      >
        <motion.h1
          className="text-[120px] font-light text-white leading-none tracking-tighter"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(255,255,255,0.1)',
          }}
          animate={{
            textShadow: [
              '0 0 40px rgba(255,255,255,0.1)',
              '0 0 80px rgba(255,255,255,0.2)',
              '0 0 40px rgba(255,255,255,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {weather.temp}°
        </motion.h1>
      </motion.div>

      {/* High/Low */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.3 }}
        className="flex items-center gap-6 mt-4"
      >
        <div className="flex items-center gap-1.5">
          <ArrowUp className="w-4 h-4 text-[#FF453A]" />
          <span className="text-white/70 text-lg">High: {weather.high}°</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowDown className="w-4 h-4 text-[#0A84FF]" />
          <span className="text-white/70 text-lg">Low: {weather.low}°</span>
        </div>
      </motion.div>

      {/* Real Feel Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.4 }}
        className="mt-8"
      >
        <motion.div
          className="relative px-6 py-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(28,28,30,0.8) 0%, rgba(44,44,46,0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(10,132,255,0.1)',
              '0 0 40px rgba(10,132,255,0.2)',
              '0 0 20px rgba(10,132,255,0.1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white/60 text-sm">Real Feel </span>
          <span className="text-white font-semibold text-lg">{weather.feels_like}°</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MainWeatherDisplay;
