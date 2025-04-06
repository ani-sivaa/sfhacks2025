'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import MedicationCard from '@/components/MedicationCard';

interface Medication {
  basic_details: {
    brand_name: string;
    generic_name: string;
    manufacturer: string;
    drug_class: string;
  };
  cost_coverage: {
    average_retail_price: string;
    generic_price: string;
  };
}

const LOADING_MESSAGES = [
  'Connecting to pharmacy database...',
  'Fetching current drug prices...',
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [results, setResults] = useState<Medication[]>([]);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  useEffect(() => {
    fetch('/drugdataset.json')
      .then(res => res.json())
      .then(data => {
        setMedications(data);
        setResults(data);
      });

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 1000);

    const timer = setTimeout(() => {
      setLoadingComplete(true);
      setTimeout(() => setIsLoading(false), 1000);
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
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filteredResults = query
      ? medications.filter(med => 
          med.basic_details.brand_name.toLowerCase().includes(query.toLowerCase()) || 
          med.basic_details.generic_name.toLowerCase().includes(query.toLowerCase()) ||
          med.basic_details.drug_class.toLowerCase().includes(query.toLowerCase())
        )
      : medications;
    
    setResults(filteredResults);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-warm-beige overflow-hidden">
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="min-h-screen flex items-center justify-center"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.5,
              filter: 'blur(10px)',
              transition: { 
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1],
                scale: { duration: 0.7 }
              }
            }}
          >
            <div className="text-center scale-center">
              <motion.h1
                className="text-6xl font-bold mb-8 text-deep-maroon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Pill 💊 Penny 
              </motion.h1>
              


              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p
                  className="text-xl text-soft-brown font-mono"
                  animate={loadingComplete ? {
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  {loadingMessage}
                </motion.p>
                {loadingComplete && (
                  <motion.p
                    className="text-xl text-healing-green font-mono absolute top-0 left-0 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Ready to search!
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.main
            key="main"
            className="container mx-auto px-4 min-h-screen flex items-center justify-center"
            initial={{ 
              opacity: 0,
              scale: 0.8,
              filter: 'blur(10px)'
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <motion.div
              className={`w-full ${showResults ? '' : 'flex flex-col items-center'}`}
              animate={{ 
                y: showResults ? 0 : 0
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1 
                  className="text-6xl md:text-7xl font-bold text-deep-maroon mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Find Affordable Medicine Alternatives
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-soft-brown"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Compare prices between brand-name and generic medications
                </motion.p>
              </motion.div>

              <motion.div
                className="w-full max-w-5xl mx-auto mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  width: showResults ? '100%' : '90%',
                  maxWidth: showResults ? '3xl' : '5xl'
                }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <SearchBar 
                  onSearch={handleSearch} 
                  suggestions={medications.map(med => ({
                    brand: med.basic_details.brand_name,
                    generic: med.basic_details.generic_name
                  }))}
                />
              </motion.div>

              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
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

                    <div className="grid grid-cols-1 gap-8">
                      {results.map((medication, index) => (
                        <MedicationCard
                          key={medication.basic_details.brand_name}
                          medication={{
                            brandName: medication.basic_details.brand_name,
                            genericName: medication.basic_details.generic_name,
                            manufacturer: medication.basic_details.manufacturer,
                            drugClass: medication.basic_details.drug_class,
                            price: {
                              brand: parseInt(medication.cost_coverage.average_retail_price.match(/\d+/)?.[0] || '0'),
                              generic: parseInt(medication.cost_coverage.generic_price.match(/\d+/)?.[0] || '0')
                            }
                          }}
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
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}