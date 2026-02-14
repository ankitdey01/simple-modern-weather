import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Navigation, Loader2 } from 'lucide-react';
import type { SearchResult } from '@/types/weather';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  onSelectLocation: (location: SearchResult) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  searchResults,
  isSearching,
  onSelectLocation,
  onUseCurrentLocation,
  isLocating,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-0 top-0 z-[70] p-4"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-lg mx-auto">
              <div className="bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Search Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search city..."
                      className="w-full bg-[#2C2C2E] rounded-xl py-3 pl-12 pr-10 text-white placeholder-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#0A84FF]/50 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-[#3A3A3C] hover:bg-[#48484A] transition-colors"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-3 text-[#0A84FF] font-medium hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Use Current Location */}
                  {!searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5"
                      onClick={onUseCurrentLocation}
                      disabled={isLocating}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A84FF]/20 flex items-center justify-center">
                        {isLocating ? (
                          <Loader2 className="w-5 h-5 text-[#0A84FF] animate-spin" />
                        ) : (
                          <Navigation className="w-5 h-5 text-[#0A84FF]" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">
                          {isLocating ? 'Getting location...' : 'Use Current Location'}
                        </p>
                        <p className="text-[#8E8E93] text-sm">
                          {isLocating ? 'Please allow location access' : 'Auto-detect your location'}
                        </p>
                      </div>
                    </motion.button>
                  )}

                  {/* Search Results */}
                  {isSearching ? (
                    <div className="p-8 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-[#0A84FF] animate-spin" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result, index) => (
                        <motion.button
                          key={`${result.lat}-${result.lon}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                          onClick={() => onSelectLocation(result)}
                        >
                          <div className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#8E8E93]" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-medium">{result.name}</p>
                            <p className="text-[#8E8E93] text-sm">
                              {[result.state, result.country].filter(Boolean).join(', ')}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="p-8 text-center">
                      <p className="text-[#8E8E93]">No cities found</p>
                    </div>
                  ) : null}

                  {/* Recent Locations (placeholder) */}
                  {!searchQuery && !isSearching && (
                    <div className="py-2">
                      <p className="px-4 py-2 text-[#8E8E93] text-xs font-medium uppercase tracking-wider">
                        Popular Cities
                      </p>
                      {[
                        { name: 'New York', state: 'NY', country: 'US', lat: 40.7128, lon: -74.0060 },
                        { name: 'London', state: '', country: 'GB', lat: 51.5074, lon: -0.1278 },
                        { name: 'Tokyo', state: '', country: 'JP', lat: 35.6762, lon: 139.6503 },
                        { name: 'Paris', state: '', country: 'FR', lat: 48.8566, lon: 2.3522 },
                      ].map((city, index) => (
                        <motion.button
                          key={city.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                          onClick={() => onSelectLocation(city)}
                        >
                          <div className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#8E8E93]" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-medium">{city.name}</p>
                            <p className="text-[#8E8E93] text-sm">
                              {[city.state, city.country].filter(Boolean).join(', ')}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
