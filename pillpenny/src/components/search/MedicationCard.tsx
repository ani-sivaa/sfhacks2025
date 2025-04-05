'use client';

import { motion } from 'framer-motion';

interface MedicationCardProps {
  medication: any;
  animate?: any;
  initial?: any;
  transition?: any;
}

export default function MedicationCard({ 
  medication,
  animate,
  initial,
  transition 
}: MedicationCardProps) {
  const savings = ((medication?.price?.brand - medication?.price?.generic) / medication?.price?.brand * 100).toFixed(0);

  return (
    <motion.div
      className="glass-panel rounded-2xl overflow-hidden relative neon-border"
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-8 relative z-10">
        <div className="absolute top-0 right-0 p-4">
          <div className="text-xs text-neon-blue opacity-50 font-mono">ID: {medication?.id}</div>
        </div>

        <motion.h3 
          className="text-2xl font-bold text-white glow-text mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {medication?.brandName}
        </motion.h3>
        <motion.p 
          className="text-lg text-neon-blue/80"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Generic: {medication?.genericName}
        </motion.p>
        
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="glass-panel p-4 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-neon-purple/80 font-mono mb-1">BRAND PRICE</p>
              <p className="text-3xl font-bold text-white">
                ${medication?.price?.brand}
              </p>
            </motion.div>
            <motion.div 
              className="glass-panel p-4 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-neon-green/80 font-mono mb-1">GENERIC PRICE</p>
              <p className="text-3xl font-bold text-neon-green">
                ${medication?.price?.generic}
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="glass-panel p-4 rounded-xl border border-white/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-neon-blue/80 font-mono mb-1">POTENTIAL SAVINGS</p>
            <p className="text-4xl font-bold text-neon-blue glow-text">{savings}%</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <motion.button
              className="relative px-6 py-3 bg-neon-blue/20 rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-white font-medium">View Details</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button
              className="relative px-6 py-3 bg-neon-green/20 rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-white font-medium">Save</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}