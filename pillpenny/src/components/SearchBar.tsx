'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: Array<{ brand: string; generic: string; }>;
}

export default function SearchBar({ onSearch, suggestions }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<{ brand: string; generic: string; }>>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.length > 1) {
      const filtered = suggestions.filter(
        med => 
          med.brand.toLowerCase().includes(newQuery.toLowerCase()) ||
          med.generic.toLowerCase().includes(newQuery.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { brand: string; generic: string; }) => {
    setQuery(suggestion.brand);
    onSearch(suggestion.brand);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      ref={searchRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter medication name..."
            className="w-full px-8 py-6 text-2xl rounded-2xl
                     bg-white/80 text-dark-base placeholder-soft-brown/80
                     border-2 border-soft-brown/20 focus:border-deep-maroon/30
                     focus:ring-2 focus:ring-deep-maroon/20
                     outline-none transition-all shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3
                     bg-deep-maroon/90 hover:bg-deep-maroon text-white text-lg
                     rounded-xl transition-colors duration-200 font-medium"
          >
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.brand}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-4 hover:bg-soft-brown/10 cursor-pointer transition-colors border-b border-soft-brown/10 last:border-none"
              >
                <div className="font-medium text-deep-maroon">{suggestion.brand}</div>
                <div className="text-sm text-soft-brown">Generic: {suggestion.generic}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}