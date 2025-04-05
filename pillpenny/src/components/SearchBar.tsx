'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
    </motion.div>
  );
}