import { motion } from 'framer-motion';
import type { WeatherCondition } from '@/types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 80,
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 'md',
  className = '' 
}) => {
  const iconSize = sizeMap[size];

  const renderIcon = () => {
    switch (condition) {
      case 'clear':
        return <SunIcon size={iconSize} />;
      case 'partly-cloudy':
        return <PartlyCloudyIcon size={iconSize} />;
      case 'cloudy':
        return <CloudyIcon size={iconSize} />;
      case 'rain':
        return <RainIcon size={iconSize} />;
      case 'drizzle':
        return <DrizzleIcon size={iconSize} />;
      case 'thunderstorm':
        return <ThunderstormIcon size={iconSize} />;
      case 'snow':
        return <SnowIcon size={iconSize} />;
      case 'fog':
        return <FogIcon size={iconSize} />;
      default:
        return <SunIcon size={iconSize} />;
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {renderIcon()}
    </div>
  );
};

// Animated Sun Icon
const SunIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <motion.circle
      cx="32"
      cy="32"
      r="14"
      fill="url(#sunGradient)"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '32px 32px' }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="32"
          y1="4"
          x2="32"
          y2="12"
          stroke="url(#sunGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${i * 45} 32 32)`}
        />
      ))}
    </motion.g>
    <defs>
      <linearGradient id="sunGradient" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FFD60A" />
        <stop offset="100%" stopColor="#FF9F0A" />
      </linearGradient>
    </defs>
  </svg>
);

// Partly Cloudy Icon
const PartlyCloudyIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <motion.circle
      cx="42"
      cy="22"
      r="10"
      fill="url(#sunGradient)"
      animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.path
      d="M46 46H24C17.3726 46 12 40.6274 12 34C12 27.3726 17.3726 22 24 22C24.5 22 25 22.02 25.5 22.06C26.9 15.5 32.7 10.5 39.5 10.5C47.5 10.5 54 17 54 25C54 25.5 53.98 26 53.94 26.5C58.5 27.5 62 31.5 62 36.5C62 41.5 58 46 52.5 46"
      fill="url(#cloudGradient)"
      animate={{ x: [0, 2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <defs>
      <linearGradient id="sunGradient" x1="32" y1="12" x2="52" y2="32">
        <stop offset="0%" stopColor="#FFD60A" />
        <stop offset="100%" stopColor="#FF9F0A" />
      </linearGradient>
      <linearGradient id="cloudGradient" x1="12" y1="10" x2="62" y2="46">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#8E8E93" />
      </linearGradient>
    </defs>
  </svg>
);

// Cloudy Icon
const CloudyIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <motion.path
      d="M18 44H50C56.6274 44 62 38.6274 62 32C62 25.3726 56.6274 20 50 20C49.5 20 49 20.02 48.5 20.06C47.1 13.5 41.3 8.5 34.5 8.5C26.5 8.5 20 15 20 23C20 23.5 20.02 24 20.06 24.5C15.5 25.5 12 29.5 12 34.5C12 39.5 16 44 21.5 44"
      fill="url(#cloudGradient2)"
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.path
      d="M8 52H40C46.6274 52 52 46.6274 52 40C52 33.3726 46.6274 28 40 28C39.5 28 39 28.02 38.5 28.06C37.1 21.5 31.3 16.5 24.5 16.5C16.5 16.5 10 23 10 31C10 31.5 10.02 32 10.06 32.5C5.5 33.5 2 37.5 2 42.5C2 47.5 6 52 11.5 52"
      fill="url(#cloudGradient3)"
      initial={{ opacity: 0.6 }}
      animate={{ x: [0, -2, 0], opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />
    <defs>
      <linearGradient id="cloudGradient2" x1="12" y1="8" x2="62" y2="44">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#8E8E93" />
      </linearGradient>
      <linearGradient id="cloudGradient3" x1="2" y1="16" x2="52" y2="52">
        <stop offset="0%" stopColor="#E5E5EA" />
        <stop offset="100%" stopColor="#636366" />
      </linearGradient>
    </defs>
  </svg>
);

// Rain Icon
const RainIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M18 36H50C56.6274 36 62 30.6274 62 24C62 17.3726 56.6274 12 50 12C49.5 12 49 12.02 48.5 12.06C47.1 5.5 41.3 0.5 34.5 0.5C26.5 0.5 20 7 20 15C20 15.5 20.02 16 20.06 16.5C15.5 17.5 12 21.5 12 26.5C12 31.5 16 36 21.5 36"
      fill="url(#rainCloudGradient)"
    />
    {[...Array(4)].map((_, i) => (
      <motion.line
        key={i}
        x1={18 + i * 10}
        y1="40"
        x2={14 + i * 10}
        y2="52"
        stroke="#0A84FF"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 16] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeIn',
          delay: i * 0.2,
        }}
      />
    ))}
    <defs>
      <linearGradient id="rainCloudGradient" x1="12" y1="0" x2="62" y2="36">
        <stop offset="0%" stopColor="#8E8E93" />
        <stop offset="100%" stopColor="#48484A" />
      </linearGradient>
    </defs>
  </svg>
);

// Drizzle Icon
const DrizzleIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M18 34H50C56.6274 34 62 28.6274 62 22C62 15.3726 56.6274 10 50 10C49.5 10 49 10.02 48.5 10.06C47.1 3.5 41.3 -1.5 34.5 -1.5C26.5 -1.5 20 5 20 13C20 13.5 20.02 14 20.06 14.5C15.5 15.5 12 19.5 12 24.5C12 29.5 16 34 21.5 34"
      fill="url(#drizzleCloudGradient)"
    />
    {[...Array(4)].map((_, i) => (
      <motion.circle
        key={i}
        cx={16 + i * 10}
        cy="42"
        r="1.5"
        fill="#0A84FF"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 6, 12] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.3,
        }}
      />
    ))}
    <defs>
      <linearGradient id="drizzleCloudGradient" x1="12" y1="-1" x2="62" y2="34">
        <stop offset="0%" stopColor="#A1A1A6" />
        <stop offset="100%" stopColor="#636366" />
      </linearGradient>
    </defs>
  </svg>
);

// Thunderstorm Icon
const ThunderstormIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M18 34H50C56.6274 34 62 28.6274 62 22C62 15.3726 56.6274 10 50 10C49.5 10 49 10.02 48.5 10.06C47.1 3.5 41.3 -1.5 34.5 -1.5C26.5 -1.5 20 5 20 13C20 13.5 20.02 14 20.06 14.5C15.5 15.5 12 19.5 12 24.5C12 29.5 16 34 21.5 34"
      fill="url(#stormCloudGradient)"
    />
    <motion.path
      d="M30 36L24 48H32L28 60L40 44H30L34 36"
      fill="#FFD60A"
      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.95, 1] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
    />
    <defs>
      <linearGradient id="stormCloudGradient" x1="12" y1="-1" x2="62" y2="34">
        <stop offset="0%" stopColor="#48484A" />
        <stop offset="100%" stopColor="#1C1C1E" />
      </linearGradient>
    </defs>
  </svg>
);

// Snow Icon
const SnowIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M18 34H50C56.6274 34 62 28.6274 62 22C62 15.3726 56.6274 10 50 10C49.5 10 49 10.02 48.5 10.06C47.1 3.5 41.3 -1.5 34.5 -1.5C26.5 -1.5 20 5 20 13C20 13.5 20.02 14 20.06 14.5C15.5 15.5 12 19.5 12 24.5C12 29.5 16 34 21.5 34"
      fill="url(#snowCloudGradient)"
    />
    {[...Array(4)].map((_, i) => (
      <motion.circle
        key={i}
        cx={16 + i * 10}
        cy="42"
        r="2"
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 5, 10] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.4,
        }}
      />
    ))}
    <defs>
      <linearGradient id="snowCloudGradient" x1="12" y1="-1" x2="62" y2="34">
        <stop offset="0%" stopColor="#E5E5EA" />
        <stop offset="100%" stopColor="#8E8E93" />
      </linearGradient>
    </defs>
  </svg>
);

// Fog Icon
const FogIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <motion.path
      d="M8 24H56"
      stroke="url(#fogGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      animate={{ opacity: [0.4, 1, 0.4], x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.path
      d="M12 34H52"
      stroke="url(#fogGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      animate={{ opacity: [0.6, 1, 0.6], x: [0, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />
    <motion.path
      d="M6 44H58"
      stroke="url(#fogGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      animate={{ opacity: [0.5, 1, 0.5], x: [0, 4, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
    <defs>
      <linearGradient id="fogGradient" x1="0" y1="24" x2="64" y2="44">
        <stop offset="0%" stopColor="#8E8E93" />
        <stop offset="100%" stopColor="#48484A" />
      </linearGradient>
    </defs>
  </svg>
);

export default WeatherIcon;
