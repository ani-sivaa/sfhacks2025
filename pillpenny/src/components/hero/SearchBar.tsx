'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from '../search/SearchResults';

// Temporary mock data
const MOCK_RESULTS = [
  {
    id: 1,
    brandName: 'Lipitor',
    genericName: 'Atorvastatin',
    price: { brand: 300, generic: 15 }
  },
  {
    id: 2,
    brandName: 'Zoloft',
    genericName: 'Sertraline',
    price: { brand: 200, generic: 20 }
  },
  {
    id: 3,
    brandName: 'Prozac',
    genericName: 'Fluoxetine',
    price: { brand: 250, generic: 12 }
  }
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResults(false);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowResults(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medication..."
              className="w-full px-8 py-6 text-xl bg-cyber-darker/50 text-white 
                       border border-white/10 rounded-2xl shadow-lg 
                       focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue/50
                       outline-none transition-all duration-300 glass-panel
                       placeholder-white/30"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 pointer-events-none" />
          </div>

          <motion.button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-4
                     bg-gradient-to-r from-neon-blue to-neon-purple
                     text-white rounded-xl font-medium
                     hover:shadow-lg hover:shadow-neon-blue/20
                     transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="cyber-loading scale-50" />
            ) : (
              "Search"
            )}
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-cyber-darker/80 z-50"
          >
            <div className="text-center">
              <div className="cyber-loading scale-150 mb-8" />
              <p className="text-neon-blue text-xl font-mono">Searching Database...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchResults isVisible={showResults} results={MOCK_RESULTS} />
    </>
  );
}