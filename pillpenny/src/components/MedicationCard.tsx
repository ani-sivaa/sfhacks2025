'use client';

import { motion } from 'framer-motion';

interface MedicationCardProps {
  medication: {
    brandName: string;
    genericName: string;
    manufacturer: string;
    drugClass: string;
    price: {
      brand: number;
      generic: number;
    };
  };
}

export default function MedicationCard({ medication }: MedicationCardProps) {
  const savings = ((medication.price.brand - medication.price.generic) / medication.price.brand * 100).toFixed(0);
  const annualSavings = ((medication.price.brand - medication.price.generic) * 12).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Brand Card */}
      <motion.div
        className="bg-gradient-to-br from-deep-maroon/5 to-white/90 rounded-lg overflow-hidden shadow-sm border border-deep-maroon/20"
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-deep-maroon">
              {medication.brandName}
            </h3>
            <span className="text-xs px-2 py-1 bg-deep-maroon/10 text-deep-maroon rounded-full">
              BRAND
            </span>
          </div>
          
          <p className="text-soft-brown/80 text-sm mt-1">
            Manufacturer: {medication.manufacturer}
          </p>
          
          <div className="mt-4 text-xs px-2 py-1 bg-deep-maroon/5 text-deep-maroon/70 rounded-full inline-block">
            {medication.drugClass}
          </div>
          
          <div className="mt-6 pt-6 border-t border-deep-maroon/10">
            <div>
              <p className="text-sm text-deep-maroon/70">Brand Price</p>
              <p className="text-3xl font-semibold text-deep-maroon">
                ${medication.price.brand}
              </p>
              <p className="text-xs text-deep-maroon/60">per month</p>
            </div>
          </div>

          <button className="mt-6 w-full px-4 py-2 bg-deep-maroon/90 hover:bg-deep-maroon 
                         text-white rounded-md transition-colors text-sm">
            View Brand Details
          </button>
        </div>
      </motion.div>

      {/* Generic Card */}
      <motion.div
        className="bg-gradient-to-br from-healing-green/5 to-white/90 rounded-lg overflow-hidden shadow-sm border border-healing-green/20"
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-healing-green">
              {medication.genericName}
            </h3>
            <span className="text-xs px-2 py-1 bg-healing-green/10 text-healing-green rounded-full">
              GENERIC
            </span>
          </div>
          
          <p className="text-soft-brown/80 text-sm mt-1">
            Alternative to {medication.brandName}
          </p>
          
          <div className="mt-4 text-xs px-2 py-1 bg-healing-green/5 text-healing-green/70 rounded-full inline-block">
            {medication.drugClass}
          </div>
          
          <div className="mt-6 pt-6 border-t border-healing-green/10">
            <div>
              <p className="text-sm text-healing-green/70">Generic Price</p>
              <p className="text-3xl font-semibold text-healing-green">
                ${medication.price.generic}
              </p>
              <p className="text-xs text-healing-green/60">per month</p>
            </div>
          </div>

          <button className="mt-6 w-full px-4 py-2 bg-healing-green/90 hover:bg-healing-green 
                         text-white rounded-md transition-colors text-sm">
            View Generic Details
          </button>
        </div>
      </motion.div>

      {/* Savings Summary */}
      <motion.div
        className="col-span-2 bg-gradient-to-r from-deep-maroon/5 via-white/90 to-healing-green/5 rounded-lg p-4 shadow-sm border border-soft-brown/20"
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-deep-maroon/80">Monthly Savings</p>
            <p className="text-xl font-semibold text-deep-maroon">
              ${(medication.price.brand - medication.price.generic).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-soft-brown">Potential Savings</p>
            <p className="text-xl font-semibold text-deep-maroon">{savings}%</p>
          </div>
          <div>
            <p className="text-sm text-healing-green/80">Annual Savings</p>
            <p className="text-xl font-semibold text-healing-green">
              ${annualSavings}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}