'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimate, AnimatePresence } from 'framer-motion';

interface MedicationCardProps {
  medication: {
    id: number;
    brandName: string;
    genericName: string;
    formula?: string;
    price: {
      brand: number;
      generic: number;
    };
    effectiveness?: number;
    sideEffects?: string[];
    interactions?: string[];
    category?: string;
    manufacturer?: string;
  };
  index: number;
}

export default function HolographicMedicationCard({ medication, index }: MedicationCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'interactions' | 'pricing'>('overview');
  const [scope, animate] = useAnimate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate savings
  const savings = ((medication.price.brand - medication.price.generic) / medication.price.brand * 100).toFixed(0);
  const annualSavings = ((medication.price.brand - medication.price.generic) * 12).toFixed(2);
  
  // Simulate price history data
  const priceHistory = [
    { month: 'Jan', brand: medication.price.brand * 0.95, generic: medication.price.generic * 0.97 },
    { month: 'Feb', brand: medication.price.brand * 0.97, generic: medication.price.generic * 0.98 },
    { month: 'Mar', brand: medication.price.brand * 0.99, generic: medication.price.generic * 0.99 },
    { month: 'Apr', brand: medication.price.brand * 1.00, generic: medication.price.generic * 1.00 },
    { month: 'May', brand: medication.price.brand * 1.02, generic: medication.price.generic * 1.00 },
    { month: 'Jun', brand: medication.price.brand * 1.05, generic: medication.price.generic * 1.01 },
  ];
  
  // 3D card hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetCardPosition = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };
  
  // Entrance animation
  useEffect(() => {
    const sequence = async () => {
      await animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, delay: index * 0.1 });
      await animate('.card-highlight', { opacity: [0, 0.7, 0.3] }, { duration: 1.5 });
      animate('.price-bar', { scaleX: 1 }, { duration: 0.8, delay: 0.2 });
      animate('.chemical-formula', { opacity: 1 }, { duration: 0.5, delay: 0.4 });
    };
    
    sequence();
  }, [scope, animate, index]);

  return (
    <motion.div 
      ref={scope}
      initial={{ opacity: 0, y: 30 }}
      className="relative"
    >
      <div 
        ref={cardRef}
        className="relative glass-panel rounded-2xl overflow-hidden transition-all duration-200 transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetCardPosition}
      >
        {/* Card highlight effect */}
        <div className="card-highlight absolute inset-0 opacity-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent" />
          <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-neon-blue/20 blur-xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-neon-purple/10 blur-xl" />
        </div>
        
        {/* Card header */}
        <div className="relative p-6 pb-3 border-b border-white/10">
          <div className="absolute top-4 right-4 flex">
            <div className="h-2 w-2 rounded-full bg-neon-blue animate-pulse mr-2" />
            <div className="text-xs text-neon-blue/70 font-mono">RX-ID: {medication.id.toString().padStart(4, '0')}</div>
          </div>
          
          <motion.div
            className="flex items-center mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mr-2">{medication.brandName}</h3>
            <div className="text-xs px-2 py-0.5 rounded bg-neon-purple/20 text-neon-purple">BRAND</div>
          </motion.div>
          
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-neon-blue/80 mr-2">{medication.genericName}</p>
            <div className="text-xs px-2 py-0.5 rounded bg-neon-green/20 text-neon-green">GENERIC</div>
          </motion.div>
          
          {/* Chemical formula visualization */}
          <div className="chemical-formula mt-3 opacity-0 flex items-center gap-2">
            <div className="text-xs text-white/50 font-mono">CHEMICAL STRUCTURE</div>
            <div className="flex items-center">
              {(medication.formula || 'C8H10N4O2').split('').map((char, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`
                    ${/[A-Z]/.test(char) ? 'text-neon-blue' : ''}
                    ${/[0-9]/.test(char) ? 'text-neon-purple text-xs align-text-top' : ''}
                    ${/[^A-Z0-9]/.test(char) ? 'text-white/60' : ''}
                  `}
                >
                  {char}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pricing comparison */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative bg-white/5 rounded-xl p-4 overflow-hidden">
              <div className="text-xs text-neon-purple/70 font-mono mb-1">BRAND PRICE</div>
              <div className="text-3xl font-bold text-white">
                ${medication.price.brand.toFixed(2)}
              </div>
              <div className="text-xs text-white/40 mt-1">per month</div>
              
              {/* Price bar visualization */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-neon-purple/20">
                <motion.div 
                  className="price-bar h-full bg-neon-purple/60 origin-left"
                  initial={{ scaleX: 0 }}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            
            <div className="relative bg-white/5 rounded-xl p-4 overflow-hidden">
              <div className="text-xs text-neon-green/70 font-mono mb-1">GENERIC PRICE</div>
              <div className="text-3xl font-bold text-neon-green">
                ${medication.price.generic.toFixed(2)}
              </div>
              <div className="text-xs text-white/40 mt-1">per month</div>
              
              {/* Price bar visualization */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-neon-green/20">
                <motion.div 
                  className="price-bar h-full bg-neon-green/60 origin-left"
                  initial={{ scaleX: 0 }}
                  style={{ width: `${(medication.price.generic / medication.price.brand) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Savings highlight */}
          <motion.div 
            className="relative bg-gradient-to-r from-neon-blue/20 via-neon-purple/10 to-neon-green/20 rounded-xl p-4 text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neon-blue/70 font-mono mb-1">MONTHLY SAVINGS</div>
                <div className="text-2xl font-bold text-white">
                  ${(medication.price.brand - medication.price.generic).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-neon-blue/70 font-mono mb-1">ANNUAL SAVINGS</div>
                <div className="text-2xl font-bold text-white">
                  ${annualSavings}
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-xs text-neon-blue/70 font-mono mb-1">POTENTIAL SAVINGS</div>
              <div className="text-4xl font-bold text-neon-blue glow-text">{savings}%</div>
            </div>
            
            <motion.div
              className="absolute -top-2 -right-2 h-10 w-10 rounded-full flex items-center justify-center bg-neon-blue/20 text-neon-blue text-xs font-bold"
              animate={{ rotate: [0, 359] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              SAVE
            </motion.div>
          </motion.div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              className="relative px-4 py-3 bg-neon-blue/20 rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDetails(!showDetails)}
            >
              <span className="relative z-10 text-white font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {showDetails ? 'HIDE DETAILS' : 'VIEW DETAILS'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <motion.button
              className="relative px-4 py-3 bg-neon-green/20 rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-white font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                SAVE TO LIST
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </div>
        
        {/* Detailed information section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/10 px-6 py-4">
                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/60'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    OVERVIEW
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'interactions' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/60'}`}
                    onClick={() => setActiveTab('interactions')}
                  >
                    INTERACTIONS
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'pricing' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/60'}`}
                    onClick={() => setActiveTab('pricing')}
                  >
                    PRICING ANALYSIS
                  </button>
                </div>
                
                {/* Tab content */}
                <div className="min-h-[200px]">
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-white/50 mb-1">CATEGORY</div>
                          <div className="text-sm text-white">{medication.category || 'Cholesterol Reducer'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/50 mb-1">MANUFACTURER</div>
                          <div className="text-sm text-white">{medication.manufacturer || 'Pfizer Inc.'}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-xs text-white/50 mb-1">EFFECTIVENESS</div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                            initial={{ width: 0 }}
                            animate={{ width: `${medication.effectiveness || 87}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <div className="text-xs text-right text-white/50 mt-1">{medication.effectiveness || 87}% Effective</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-white/50 mb-2">COMMON SIDE EFFECTS</div>
                        <div className="flex flex-wrap gap-2">
                          {(medication.sideEffects || ['Headache', 'Dizziness', 'Nausea', 'Fatigue']).map((effect, i) => (
                            <div 
                              key={i} 
                              className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded"
                            >
                              {effect}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'interactions' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-xs text-white/50 mb-2">POTENTIAL INTERACTIONS</div>
                      <div className="space-y-2">
                        {(medication.interactions || ['Warfarin', 'Alcohol', 'Grapefruit juice', 'Antacids']).map((item, i) => (
                          <div 
                            key={i} 
                            className="bg-white/5 p-2 rounded flex items-center"
                          >
                            <div className="h-2 w-2 rounded-full bg-neon-purple mr-2" />
                            <div className="text-sm text-white">{item}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 border border-neon-purple/30 bg-neon-purple/5 rounded-lg">
                        <div className="text-xs font-medium text-neon-purple mb-1">IMPORTANT</div>
                        <div className="text-xs text-white/70">
                          Always consult with your healthcare provider about potential drug interactions.
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'pricing' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <div className="text-xs text-white/50 mb-2">6-MONTH PRICE TREND</div>
                      
                      {/* Simple price history chart */}
                      <div className="h-40 relative">
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
                        
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/40">
                          <div>${Math.ceil(medication.price.brand * 1.1)}</div>
                          <div>${Math.ceil(medication.price.brand * 0.9)}</div>
                        </div>
                        
                        {/* Chart */}
                        <div className="absolute inset-0 pt-5 pl-8 pb-5">
                          {/* Brand price line */}
                          <svg className="w-full h-full" preserveAspectRatio="none">
                            <motion.path
                              d={`M 0,${100 - (priceHistory[0].brand / (medication.price.brand * 1.1)) * 100} 
                                  ${priceHistory.map((point, i) => {
                                    const x = (i / (priceHistory.length - 1)) * 100;
                                    const y = 100 - (point.brand / (medication.price.brand * 1.1)) * 100;
                                    return `L ${x},${y}`;
                                  }).join(' ')}`}
                              stroke="rgba(181, 55, 242, 0.8)"
                              strokeWidth="2"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.2 }}
                            />
                          </svg>
                          
                          {/* Generic price line */}
                          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <motion.path
                              d={`M 0,${100 - (priceHistory[0].generic / (medication.price.brand * 1.1)) * 100} 
                                  ${priceHistory.map((point, i) => {
                                    const x = (i / (priceHistory.length - 1)) * 100;
                                    const y = 100 - (point.generic / (medication.price.brand * 1.1)) * 100;
                                    return `L ${x},${y}`;
                                  }).join(' ')}`}
                              stroke="rgba(0, 255, 140, 0.8)"
                              strokeWidth="2"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.4 }}
                            />
                          </svg>
                          
                          {/* Price points for brand */}
                          {priceHistory.map((point, i) => {
                            const x = (i / (priceHistory.length - 1)) * 100 + '%';
                            const y = `calc(${100 - (point.brand / (medication.price.brand * 1.1)) * 100}% - 3px)`;
                            
                            return (
                              <motion.div
                                key={`brand-${i}`}
                                className="absolute h-2 w-2 rounded-full bg-neon-purple"
                                style={{ left: x, top: y }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              />
                            );
                          })}
                          
                          {/* Price points for generic */}
                          {priceHistory.map((point, i) => {
                            const x = (i / (priceHistory.length - 1)) * 100 + '%';
                            const y = `calc(${100 - (point.generic / (medication.price.brand * 1.1)) * 100}% - 3px)`;
                            
                            return (
                              <motion.div
                                key={`generic-${i}`}
                                className="absolute h-2 w-2 rounded-full bg-neon-green"
                                style={{ left: x, top: y }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.1 }}
                              />
                            );
                          })}
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-white/40 translate-y-5 px-8">
                          {priceHistory.map((point, i) => (
                            <div key={i}>{point.month}</div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex justify-center gap-4 mt-8">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-neon-purple mr-1" />
                          <span className="text-xs text-white/60">Brand</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-neon-green mr-1" />
                          <span className="text-xs text-white/60">Generic</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}