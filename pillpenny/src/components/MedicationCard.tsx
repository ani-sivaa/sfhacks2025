'use client';

import { motion } from 'framer-motion';

interface MedicationCardProps {
  medication: {
    brandName: string;
    genericName: string;
    price: {
      brand: number;
      generic: number;
    };
  };
}

export default function MedicationCard({ medication }: MedicationCardProps) {
  const savings = ((medication.price.brand - medication.price.generic) / medication.price.brand * 100).toFixed(0);

  return (
    <motion.div
      className="bg-white/90 rounded-lg overflow-hidden shadow-sm border border-soft-brown/20"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-deep-maroon">
          {medication.brandName}
        </h3>
        <p className="text-soft-brown mt-1">
          Generic: {medication.genericName}
        </p>
        
        <div className="mt-6 pt-6 border-t border-soft-brown/20">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-soft-brown">Brand Price</p>
              <p className="text-2xl font-semibold text-dark-base">
                ${medication.price.brand}
              </p>
            </div>
            <div>
              <p className="text-sm text-healing-green/80">Generic Price</p>
              <p className="text-2xl font-semibold text-healing-green">
                ${medication.price.generic}
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-deep-maroon/5 p-4 rounded-md text-center">
            <p className="text-sm text-deep-maroon/80">Potential Savings</p>
            <p className="text-2xl font-semibold text-deep-maroon">{savings}%</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="px-4 py-2 bg-deep-maroon/90 hover:bg-deep-maroon 
                           text-white rounded-md transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 bg-white border border-soft-brown/30 
                           hover:bg-soft-brown/10 text-dark-base rounded-md 
                           transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}