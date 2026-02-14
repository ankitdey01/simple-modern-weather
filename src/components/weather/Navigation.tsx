import React from 'react';
import { motion } from 'framer-motion';
import { Menu, MapPin, Settings } from 'lucide-react';

interface NavigationProps {
  locationName: string;
  onMenuClick?: () => void;
  onLocationClick?: () => void;
  onSettingsClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  locationName,
  onMenuClick,
  onLocationClick,
  onSettingsClick,
}) => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-lg mx-auto">
        <nav className="flex items-center justify-between">
          {/* Hamburger Menu */}
          <motion.button
            onClick={onMenuClick}
            className="p-2 rounded-xl bg-[#1C1C1E]/40 backdrop-blur-md border border-white/5 hover:bg-[#1C1C1E]/60 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>

          {/* Location */}
          <motion.button
            onClick={onLocationClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1C1E]/40 backdrop-blur-md border border-white/5 hover:bg-[#1C1C1E]/60 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPin className="w-4 h-4 text-[#0A84FF] group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium text-sm tracking-wide">
              {locationName}
            </span>
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-white/60 ml-0.5"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>

          {/* Settings */}
          <motion.button
            onClick={onSettingsClick}
            className="p-2 rounded-xl bg-[#1C1C1E]/40 backdrop-blur-md border border-white/5 hover:bg-[#1C1C1E]/60 transition-colors"
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-white" />
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navigation;
