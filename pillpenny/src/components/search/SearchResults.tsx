'use client';

import { motion } from 'framer-motion';
import MedicationCard from './MedicationCard';

interface SearchResultsProps {
  isVisible: boolean;
  results?: any[];
}

export default function SearchResults({ isVisible, results = [] }: SearchResultsProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full mx-auto px-6 sm:px-8 lg:px-12 py-12"
    >
      <div className="relative max-w-[2000px] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none" />
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {results.map((result, index) => (
            <MedicationCard
              key={result.id}
              medication={result}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}