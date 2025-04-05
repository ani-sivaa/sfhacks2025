'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import MedicationCard from '@/components/MedicationCard';

// Mock data for demonstration
const MOCK_MEDICATIONS = [
  {
    id: 1001,
    brandName: 'Lipitor',
    genericName: 'Atorvastatin',
    price: { brand: 300, generic: 15 }
  },
  {
    id: 1002,
    brandName: 'Zoloft',
    genericName: 'Sertraline',
    price: { brand: 200, generic: 20 }
  },
  {
    id: 1003,
    brandName: 'Synthroid',
    genericName: 'Levothyroxine',
    price: { brand: 150, generic: 12 }
  },
  {
    id: 1004,
    brandName: 'Ventolin',
    genericName: 'Albuterol',
    price: { brand: 85, generic: 25 }
  }
];

const LOADING_MESSAGES = [
  'Connecting to pharmacy database...',
  'Fetching current drug prices...',
  
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(MOCK_MEDICATIONS);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  
  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 1000);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(messageInterval);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setShowResults(false);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter results
    const filteredResults = query
      ? MOCK_MEDICATIONS.filter(med => 
          med.brandName.toLowerCase().includes(query.toLowerCase()) || 
          med.genericName.toLowerCase().includes(query.toLowerCase())
        )
      : MOCK_MEDICATIONS;
    
    setResults(filteredResults);
    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-beige">
        <div className="text-center">
          <motion.h1
            className="text-6xl font-bold mb-8 text-deep-maroon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Pill Penny
          </motion.h1>
          <motion.p
            className="text-xl text-soft-brown font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {loadingMessage}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-beige">
      <main className="container mx-auto px-4">
        <motion.div
          className={`min-h-screen flex flex-col ${showResults ? 'pt-8' : 'justify-center -mt-32'}`}
          animate={{ paddingTop: showResults ? '2rem' : '0', marginTop: showResults ? '0' : '-8rem' }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-12"
            animate={{ 
              scale: showResults ? 0.8 : 1,
              marginBottom: showResults ? '2rem' : '3rem'
            }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-deep-maroon mb-6">
              Find Affordable Medicine Alternatives
            </h1>
            <p className="text-xl md:text-2xl text-soft-brown">
              Compare prices between brand-name and generic medications
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-5xl mx-auto mb-12"
            animate={{ 
              width: showResults ? '100%' : '90%',
              maxWidth: showResults ? '3xl' : '5xl'
            }}
            transition={{ duration: 0.5 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-7xl mx-auto px-4"
              >
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-deep-maroon">
                    {searchQuery ? `Results for "${searchQuery}"` : 'All Medications'}
                  </h2>
                  <span className="text-lg text-soft-brown">
                    Found {results.length} medications
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {results.map((medication, index) => (
                    <MedicationCard
                      key={medication.id}
                      medication={medication}
                    />
                  ))}
                </div>

                {results.length === 0 && (
                  <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
                    <p className="text-xl text-soft-brown mb-4">No medications found</p>
                    <button
                      className="text-lg text-deep-maroon hover:text-healing-green transition-colors"
                      onClick={() => handleSearch('')}
                    >
                      View all medications
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}