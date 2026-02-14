import { motion } from 'framer-motion';
import type { CurrentWeather } from '@/types/weather';
import { GlassCard } from './GlassCard';
import { getUVIndexLevel, getAirQualityLevel } from '@/services/weatherApi';
import { 
  Sun, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset
} from 'lucide-react';

interface WeatherMetricsProps {
  weather: CurrentWeather;
}

const customExpo = [0.16, 1, 0.3, 1] as const;

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ weather }) => {
  const uvLevel = getUVIndexLevel(weather.uvIndex);
  const aqiLevel = getAirQualityLevel(weather.airQuality);

  return (
    <motion.div
      className="grid grid-cols-2 gap-3 px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.08, delayChildren: 0.4 }}
    >
      {/* UV Index Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo }}
      >
        <GlassCard className="p-4 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-[#FFD60A]" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">UV Index</span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-semibold text-white">{weather.uvIndex}</span>
            <span className="text-sm text-white/70" style={{ color: uvLevel.color }}>
              {uvLevel.label}
            </span>
          </div>
          {/* UV Gauge */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ 
                background: `linear-gradient(90deg, #30D158, #FFD60A, #FF9F0A, #FF453A, #AF52DE)`,
                width: `${Math.min((weather.uvIndex / 11) * 100, 100)}%`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((weather.uvIndex / 11) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5, ease: customExpo }}
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Air Quality Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.08 }}
      >
        <GlassCard className="p-4 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-[#30D158]" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Air Quality</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-semibold text-white">{weather.airQuality}</span>
              <p className="text-sm text-white/70 mt-0.5" style={{ color: aqiLevel.color }}>
                {aqiLevel.label}
              </p>
            </div>
            {/* Circular Indicator */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke={aqiLevel.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 24}` }}
                  animate={{ 
                    strokeDashoffset: `${2 * Math.PI * 24 * (1 - Math.min(weather.airQuality / 200, 1))}` 
                  }}
                  transition={{ duration: 1.5, delay: 0.5, ease: customExpo }}
                />
              </svg>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Visibility Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.16 }}
      >
        <GlassCard className="p-4 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-[#0A84FF]" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Visibility</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-semibold text-white">{weather.visibility}</span>
              <span className="text-lg text-white/60 ml-1">mi</span>
            </div>
            {/* Radial Graphic */}
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-white/10"
                style={{
                  background: `radial-gradient(circle, rgba(10,132,255,0.3) 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 w-16 h-16 rounded-full"
                style={{
                  border: '2px solid rgba(10,132,255,0.5)',
                  borderTopColor: 'transparent',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Wind Speed Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.24 }}
      >
        <GlassCard className="p-4 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-4 h-4 text-[#FF9F0A]" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Wind</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-semibold text-white">{weather.windSpeed}</span>
              <span className="text-lg text-white/60 ml-1">mph</span>
            </div>
            {/* Compass */}
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/20" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: weather.windDeg }}
                transition={{ duration: 1, ease: customExpo }}
              >
                <div 
                  className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#FF453A]"
                  style={{ transform: 'translateY(-2px)' }}
                />
              </motion.div>
              <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[8px] text-white/40">N</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Humidity Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.32 }}
      >
        <GlassCard className="p-4 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-4 h-4 text-[#0A84FF]" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Humidity</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-semibold text-white">{weather.humidity}</span>
              <span className="text-lg text-white/60 ml-1">%</span>
            </div>
            {/* Cylinder Fill */}
            <div className="relative w-8 h-14 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A84FF] to-[#5AC8FA] rounded-full"
                initial={{ height: 0 }}
                animate={{ height: `${weather.humidity}%` }}
                transition={{ duration: 1, delay: 0.5, ease: customExpo }}
              />
              {/* Bubbles effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                  style={{ left: `${20 + i * 25}%` }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Pressure Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.4 }}
      >
        <GlassCard className="p-4 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-[#AF52DE]" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Pressure</span>
          </div>
          <div>
            <span className="text-3xl font-semibold text-white">{weather.pressure}</span>
            <span className="text-sm text-white/60 ml-1">hPa</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#AF52DE] to-[#BF5AF2]"
                initial={{ width: 0 }}
                animate={{ width: `${((weather.pressure - 950) / (1050 - 950)) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Sunrise/Sunset Card - Full Width */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customExpo, delay: 0.48 }}
        className="col-span-2"
      >
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD60A]/20 to-[#FF9F0A]/20 flex items-center justify-center">
                <Sunrise className="w-5 h-5 text-[#FFD60A]" />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider">Sunrise</p>
                <p className="text-white font-semibold text-lg">{weather.sunrise}</p>
              </div>
            </div>
            
            {/* Day/Night Arc */}
            <div className="flex-1 mx-6 relative h-12">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <motion.path
                  d="M 0 40 Q 50 -20 100 40"
                  fill="none"
                  stroke="url(#sunArc)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="sunArc" x1="0" y1="40" x2="100" y2="0">
                    <stop offset="0%" stopColor="#FFD60A" />
                    <stop offset="50%" stopColor="#FF9F0A" />
                    <stop offset="100%" stopColor="#FF453A" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                className="absolute w-3 h-3 bg-[#FFD60A] rounded-full shadow-lg shadow-[#FFD60A]/50"
                style={{ top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(255,214,10,0.5)',
                    '0 0 20px rgba(255,214,10,0.8)',
                    '0 0 10px rgba(255,214,10,0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-white/60 text-xs uppercase tracking-wider">Sunset</p>
                <p className="text-white font-semibold text-lg">{weather.sunset}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF453A]/20 to-[#FF9F0A]/20 flex items-center justify-center">
                <Sunset className="w-5 h-5 text-[#FF453A]" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default WeatherMetrics;
