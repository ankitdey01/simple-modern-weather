import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSkeleton: React.FC = () => {
  const shimmer = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
    backgroundSize: '200% 100%',
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8">
      {/* Main Weather Skeleton */}
      <div className="flex flex-col items-center py-8">
        {/* Icon */}
        <motion.div
          className="w-20 h-20 rounded-full mb-4"
          style={shimmer}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Condition */}
        <motion.div
          className="w-24 h-5 rounded-full mb-4"
          style={shimmer}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.1 }}
        />
        
        {/* Temperature */}
        <motion.div
          className="w-32 h-28 rounded-2xl mb-4"
          style={shimmer}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.2 }}
        />
        
        {/* High/Low */}
        <div className="flex gap-4 mb-6">
          <motion.div
            className="w-16 h-5 rounded-full"
            style={shimmer}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.3 }}
          />
          <motion.div
            className="w-16 h-5 rounded-full"
            style={shimmer}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.4 }}
          />
        </div>
        
        {/* Real Feel */}
        <motion.div
          className="w-28 h-10 rounded-full"
          style={shimmer}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        />
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="py-6">
        <motion.div
          className="w-28 h-4 rounded-full mb-4"
          style={shimmer}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.6 }}
        />
        <div className="flex gap-3">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-16 h-24 rounded-2xl"
              style={shimmer}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.7 + i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-2 gap-3 py-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="h-28 rounded-2xl"
            style={shimmer}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.8 + i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
