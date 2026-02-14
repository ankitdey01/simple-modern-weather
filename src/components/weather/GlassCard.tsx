import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  glowColor?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  onClick,
  hoverEffect = true,
  glowColor = 'rgba(255, 255, 255, 0.1)'
}) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-[#1C1C1E]/60 backdrop-blur-xl',
        'border border-white/10',
        'shadow-lg shadow-black/20',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hoverEffect ? {
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
      } : undefined}
      whileTap={hoverEffect ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : undefined}
      style={{
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${glowColor}`
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 4,
        }}
      />
      {children}
    </motion.div>
  );
};

export default GlassCard;
