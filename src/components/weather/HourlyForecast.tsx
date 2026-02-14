import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { HourlyForecast as HourlyForecastType } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

const customExpo = [0.16, 1, 0.3, 1] as const;

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">
        Hourly Forecast
      </h3>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
        >
          {hourly.map((hour, index) => (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: customExpo }}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-2xl min-w-[70px] ${
                index === 0 
                  ? 'bg-[#0A84FF]/20 border border-[#0A84FF]/30' 
                  : 'bg-[#1C1C1E]/40 border border-white/5'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-sm mb-2 ${index === 0 ? 'text-[#0A84FF]' : 'text-white/70'}`}>
                {hour.time}
              </span>
              <WeatherIcon condition={hour.condition} size="sm" />
              <span className="text-white font-semibold mt-2">{hour.temp}°</span>
              {hour.pop !== undefined && hour.pop > 0 && (
                <span className="text-[#0A84FF] text-xs mt-1">{hour.pop}%</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
