'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicSearch from '@/components/HolographicSearch';
import HolographicMedicationCard from '@/components/HolographicMedicationCard';
import NavigationPanel from '@/components/NavigationPanel';

// Mock data for demonstration
const MOCK_MEDICATIONS = [
  {
    id: 1001,
    brandName: 'Lipitor',
    genericName: 'Atorvastatin',
    formula: 'C33H35FN2O5',
    price: { brand: 300, generic: 15 },
    effectiveness: 92,
    category: 'Statin',
    manufacturer: 'Pfizer',
    sideEffects: ['Muscle pain', 'Diarrhea', 'Nausea', 'Joint pain'],
    interactions: ['Grapefruit juice', 'Certain antibiotics', 'Antifungals', 'Cyclosporine']
  },
  {
    id: 1002,
    brandName: 'Zoloft',
    genericName: 'Sertraline',
    formula: 'C17H17Cl2N',
    price: { brand: 200, generic: 20 },
    effectiveness: 87,
    category: 'SSRI Antidepressant',
    manufacturer: 'Pfizer',
    sideEffects: ['Insomnia', 'Dry mouth', 'Dizziness', 'Fatigue'],
    interactions: ['MAO inhibitors', 'Pimozide', 'Disulfiram', 'Blood thinners']
  },
  {
    id: 1003,
    brandName: 'Synthroid',
    genericName: 'Levothyroxine',
    formula: 'C15H11I4NO4',
    price: { brand: 150, generic: 12 },
    effectiveness: 95,
    category: 'Thyroid Hormone',
    manufacturer: 'AbbVie',
    sideEffects: ['Weight loss', 'Tremors', 'Headache', 'Insomnia'],
    interactions: ['Antacids', 'Calcium supplements', 'Iron supplements', 'Cholestyramine']
  },
  {
    id: 1004,
    brandName: 'Ventolin',
    genericName: 'Albuterol',
    formula: 'C13H21NO3',
    price: { brand: 85, generic: 25 },
    effectiveness: 90,
    category: 'Bronchodilator',
    manufacturer: 'GlaxoSmithKline',
    sideEffects: ['Tremors', 'Nervousness', 'Headache', 'Throat irritation'],
    interactions: ['Beta-blockers', 'Diuretics', 'Digoxin', 'MAO inhibitors']
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(MOCK_MEDICATIONS);
  const [systemMessages, setSystemMessages] = useState<string[]>([]);
  const [activeNav, setActiveNav] = useState('search');
  
  // Handle search submission
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowResults(false);
    addSystemMessage(`INITIATING SEARCH: "${query}"`);
    
    // Simulate API call
    await simulateAPICall(1200);
    addSystemMessage('CONNECTING TO PHARMACY DATABASE');
    
    await simulateAPICall(800);
    addSystemMessage('ANALYZING MEDICATION DATA');
    
    await simulateAPICall(1500);
    addSystemMessage('COMPARING PRICES FROM 1,243 SOURCES');
    
    await simulateAPICall(800);
    
    // Filter mocked results based on query
    let filteredResults = MOCK_MEDICATIONS;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredResults = MOCK_MEDICATIONS.filter(
        med => med.brandName.toLowerCase().includes(lowerQuery) || 
               med.genericName.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Show results
    setResults(filteredResults);
    setIsSearching(false);
    setShowResults(true);
    
    if (filteredResults.length > 0) {
      addSystemMessage(`SEARCH COMPLETE: FOUND ${filteredResults.length} MATCHES`);
    } else {
      addSystemMessage('SEARCH COMPLETE: NO MATCHES FOUND');
    }
  };
  
  // Simulate API delay
  const simulateAPICall = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Add system message with auto-removal
  const addSystemMessage = (message: string) => {
    setSystemMessages(prev => [...prev, message]);
    setTimeout(() => {
      setSystemMessages(prev => prev.filter(msg => msg !== message));
    }, 5000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Neural background */}
      
      {/* Status bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-6 bg-cyber-darker/80 backdrop-blur-sm border-b border-white/10 px-4 z-50
                   flex items-center justify-between text-xs font-mono text-white/50"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-neon-green mr-1 animate-pulse"></div>
            SYSTEM ONLINE
          </div>
          <div>|</div>
          <div>PILL PENNY v2.0.5</div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-neon-blue">
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
          <div>|</div>
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-neon-purple mr-1 animate-ping"></div>
            API STATUS: CONNECTED
          </div>
        </div>
      </motion.div>
      
      
      {/* Main content */}
      <main className="pt-16 pb-24 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 glow-text"
              initial={{ letterSpacing: "0em" }}
              animate={{ letterSpacing: "0.02em" }}
              transition={{ duration: 1.5 }}
            >
              PILL PENNY
            </motion.h1>
            
            <motion.div
              className="text-lg text-neon-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ADVANCED PHARMACEUTICAL PRICE COMPARISON
            </motion.div>
            
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 opacity-20 text-[150px] font-bold text-neon-purple blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ delay: 0.8 }}
            >
              Rx
            </motion.div>
          </motion.div>
          
          {/* Search */}
          <div className="mb-16">
            <HolographicSearch 
              onSearch={handleSearch} 
              isSearching={isSearching} 
            />
          </div>
          
          {/* System messages */}
          <AnimatePresence>
            {systemMessages.length > 0 && (
              <motion.div 
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="bg-cyber-darker/80 backdrop-blur-md border border-neon-blue/30 rounded-lg p-3 max-w-lg">
                  {systemMessages.map((message, index) => (
                    <motion.div 
                      key={index}
                      className="text-neon-blue font-mono text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      &gt; {message}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Search results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-neon-blue rounded-full mr-2" />
                      <h2 className="text-2xl font-bold text-white">
                        {searchQuery ? `Results for "${searchQuery}"` : 'All Medications'}
                      </h2>
                    </div>
                    
                    <div className="text-sm text-white/60 font-mono">
                      FOUND {results.length} MEDICATIONS
                    </div>
                  </div>
                  
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {results.map((medication, index) => (
                        <HolographicMedicationCard 
                          key={medication.id}
                          medication={medication}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass-panel rounded-2xl p-12 text-center">
                      <div className="text-2xl text-white mb-4">No medications found</div>
                      <div className="text-neon-blue mb-6">Try broadening your search terms</div>
                      <button
                        className="px-6 py-3 bg-neon-blue/20 text-white rounded-xl"
                        onClick={() => handleSearch('')}
                      >
                        View All Medications
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Data visualization section */}
                {results.length > 0 && (
                  <motion.div
                    className="glass-panel rounded-2xl p-8 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Savings Analysis</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Total savings */}
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="text-xs text-white/50 mb-2">POTENTIAL MONTHLY SAVINGS</div>
                        <div className="text-3xl font-bold text-neon-blue">
                          ${results.reduce((total, med) => total + (med.price.brand - med.price.generic), 0).toFixed(2)}
                        </div>
                        <div className="text-xs text-white/50 mt-1">with generic alternatives</div>
                      </div>
                      
                      {/* Average savings percentage */}
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="text-xs text-white/50 mb-2">AVERAGE SAVINGS</div>
                        <div className="text-3xl font-bold text-neon-purple">
                          {Math.round(results.reduce((total, med) => 
                            total + ((med.price.brand - med.price.generic) / med.price.brand * 100), 0) / results.length)}%
                        </div>
                        <div className="text-xs text-white/50 mt-1">across all medications</div>
                      </div>
                      
                      {/* Annual projection */}
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="text-xs text-white/50 mb-2">PROJECTED ANNUAL SAVINGS</div>
                        <div className="text-3xl font-bold text-neon-green">
                          ${(results.reduce((total, med) => total + (med.price.brand - med.price.generic), 0) * 12).toFixed(2)}
                        </div>
                        <div className="text-xs text-white/50 mt-1">over 12 months</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Initial state content */}
          {!isSearching && !showResults && (
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="text-5xl text-neon-blue mb-6"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ↑
              </motion.div>
              
              <p className="text-white/70 text-lg">
                Search for a medication above to compare prices between brand-name and generic alternatives.
              </p>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                  <div className="text-neon-blue text-3xl mb-3">90%</div>
                  <div className="text-white/80">Average savings when switching to generic medications</div>
                </div>
                
                <div className="glass-panel p-6 rounded-xl">
                  <div className="text-neon-blue text-3xl mb-3">10,000+</div>
                  <div className="text-white/80">Medications in our comprehensive database</div>
                </div>
                
                <div className="glass-panel p-6 rounded-xl">
                  <div className="text-neon-blue text-3xl mb-3">1,243</div>
                  <div className="text-white/80">Pharmacy price sources continuously monitored</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}