'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimate, animate, useInView } from 'framer-motion';

interface SearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function HolographicSearch({ onSearch, isSearching }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [scope, animateScope] = useAnimate();
  const inputRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(scope);
  
  // Holographic grid effect elements
  const gridSize = 10;
  const gridPoints = Array.from({ length: gridSize * gridSize });
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  
  // Focus animation effect
  useEffect(() => {
    if (isInView) {
      const enterAnimation = async () => {
        await animateScope('.grid-point', { opacity: [0, 0.7], scale: [0, 1] }, 
          { duration: 1.5, delay: stagger(0.01) });
          
        animate('.grid-container', 
          { rotateX: [20, 25, 20], rotateY: [0, 5, 0] }, 
          { duration: 10, repeat: Infinity, ease: 'easeInOut' });
      };
      
      enterAnimation();
    }
  }, [isInView, animateScope]);
  
  // Handle focus state changes
  useEffect(() => {
    if (isFocused) {
      animateScope('.input-highlight', { 
        opacity: 1, 
        width: '100%',
        boxShadow: [
          '0 0 0px var(--neon-blue)',
          '0 0 10px var(--neon-blue)',
          '0 0 20px var(--neon-blue)'
        ]
      }, { duration: 0.5 });
      
      // Animate holographic elements on focus
      animateScope('.hologram-element', { opacity: 1, scale: 1 }, 
        { duration: 0.5, delay: stagger(0.05) });
        
      animateScope('.grid-point', { opacity: 1 }, { duration: 0.3 });
    } else {
      animateScope('.input-highlight', { 
        opacity: 0.5, 
        width: '30%',
        boxShadow: '0 0 0px var(--neon-blue)'
      }, { duration: 0.5 });
      
      // Reduce holographic elements on blur
      animateScope('.hologram-element', { opacity: 0.3, scale: 0.95 }, 
        { duration: 0.5 });
        
      animateScope('.grid-point', { opacity: 0.5 }, { duration: 0.3 });
    }
  }, [isFocused, animateScope]);

  const stagger = (amount: number) => {
    return (i: number) => i * amount;
  };

  return (
    <div ref={scope} className="relative z-10 max-w-4xl w-full mx-auto">
      {/* Holographic Grid */}
      <div className="grid-container absolute inset-0 -z-10 perspective-1000">
        <div className="grid h-full w-full grid-cols-10 grid-rows-10 transform-3d">
          {gridPoints.map((_, i) => (
            <div 
              key={i}
              className="grid-point opacity-0 h-full w-full border border-neon-blue/10"
            />
          ))}
        </div>
      </div>
      
      {/* Floating holographic elements */}
      <div className="absolute -top-20 -left-10 hologram-element opacity-0">
        <motion.div 
          className="text-neon-blue/30 font-mono text-xs"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          SEARCH_MODULE.v1.2
        </motion.div>
      </div>
      
      <div className="absolute -bottom-12 -right-10 hologram-element opacity-0">
        <motion.div 
          className="text-neon-purple/30 font-mono text-xs"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          RX_DATABASE.CONNECTED
        </motion.div>
      </div>
      
      <div className="absolute top-1/4 -right-16 hologram-element opacity-0">
        <motion.div 
          className="text-neon-green/30 font-mono text-xs"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          PHARMA_API.READY
        </motion.div>
      </div>
      
      {/* Main Search Interface */}
      <motion.form 
        onSubmit={handleSearch}
        className="relative glass-panel rounded-2xl overflow-hidden p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-2 flex justify-between items-center text-xs font-mono text-neon-blue/70">
          <div>PHARMACEUTICAL DATABASE SEARCH</div>
          <div className="flex items-center gap-2">
            <motion.div 
              className="h-2 w-2 rounded-full bg-neon-green"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            SYSTEM ONLINE
          </div>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="input-highlight h-[2px] w-[30%] bg-neon-blue/70 opacity-50 absolute bottom-0 left-0" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter medication name..."
            className="w-full bg-transparent border-0 border-b border-white/10 px-2 py-4 text-xl
                     text-white focus:outline-none focus:ring-0
                     placeholder-white/30 font-medium"
          />
          
          <div className="absolute right-2 top-4 text-white/40 font-mono text-xs">
            {query.length > 0 ? `CHARS: ${query.length}` : 'READY'}
          </div>
        </div>
        
        <div className="flex gap-4">
          <motion.button
            type="submit"
            className="flex-1 relative overflow-hidden rounded-xl px-6 py-3 
                     text-white font-medium bg-neon-blue/20 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSearching}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSearching ? (
                <>
                  <div className="cyber-loading scale-50" />
                  <span>PROCESSING</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  SEARCH DATABASE
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-50 transition-opacity" />
          </motion.button>
          
          <motion.button
            type="button"
            className="relative overflow-hidden rounded-xl px-3 
                     text-white font-medium bg-white/5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          >
            <span className="relative z-10 text-white/80">CLEAR</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
        
        {/* Advanced search options */}
        <motion.div 
          className="mt-6 grid grid-cols-3 gap-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="rounded-lg border border-white/10 py-2 px-1 text-xs text-white/60 cursor-pointer hover:bg-white/5 transition-colors">
            INSURANCE FILTER
          </div>
          <div className="rounded-lg border border-white/10 py-2 px-1 text-xs text-white/60 cursor-pointer hover:bg-white/5 transition-colors">
            PHARMACY LOCATOR
          </div>
          <div className="rounded-lg border border-white/10 py-2 px-1 text-xs text-white/60 cursor-pointer hover:bg-white/5 transition-colors">
            ADVANCED OPTIONS
          </div>
        </motion.div>
        
        {/* Animated scanner effect */}
        {isSearching && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent w-full"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: 0 }}
            />
          </motion.div>
        )}
      </motion.form>
      
      <div className="mt-4 flex justify-between items-center text-white/30 text-xs font-mono px-2">
        <div>DATABASE: NATIONAL RX REGISTRY</div>
        <div>LAST UPDATED: 2023-11-15</div>
      </div>
    </div>
  );
}