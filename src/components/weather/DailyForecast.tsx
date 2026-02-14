import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { DailyForecast as DailyForecastType } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { GlassCard } from './GlassCard';

interface DailyForecastProps {
  daily: DailyForecastType[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      className="px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">
        7-Day Forecast
      </h3>

      <div className="space-y-2">
        {daily.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.4 }}
          >
            <GlassCard
              className="overflow-hidden"
              hoverEffect={false}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-white font-medium w-16 text-left">
                    {index === 0 ? 'Today' : day.day.slice(0, 3)}
                  </span>
                  <WeatherIcon condition={day.condition} size="sm" />
                  {day.pop !== undefined && day.pop > 10 && (
                    <span className="text-[#0A84FF] text-xs">{day.pop}%</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">{day.low}°</span>
                    {/* Temperature Bar */}
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden relative">
                      <motion.div
                        className="absolute h-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#FF453A]"
                        initial={{ width: 0, left: 0 }}
                        animate={{ 
                          width: `${((day.high - day.low) / 40) * 100}%`,
                          left: `${((day.low + 10) / 50) * 100}%`
                        }}
                        transition={{ duration: 0.8, delay: index * 0.05 + 0.5 }}
                      />
                    </div>
                    <span className="text-white font-semibold">{day.high}°</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-white/5">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-white/40 text-xs uppercase">Morning</p>
                          <p className="text-white font-medium">{Math.round((day.high + day.low) / 2 - 3)}°</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase">Afternoon</p>
                          <p className="text-white font-medium">{day.high}°</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase">Evening</p>
                          <p className="text-white font-medium">{Math.round((day.high + day.low) / 2)}°</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyForecast;
