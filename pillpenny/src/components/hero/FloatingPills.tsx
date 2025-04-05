'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Pill {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'pill' | 'capsule' | 'molecule';
  rotation: number;
}

const generatePill = (id: number): Pill => ({
  id,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 20 + 10,
  duration: Math.random() * 10 + 20,
  delay: Math.random() * -20,
  type: ['pill', 'capsule', 'molecule'][Math.floor(Math.random() * 3)] as Pill['type'],
  rotation: Math.random() * 360,
});

export default function FloatingPills() {
  const [pills, setPills] = useState<Pill[]>([]);

  useEffect(() => {
    setPills(Array.from({ length: 15 }, (_, i) => generatePill(i)));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pills.map((pill) => (
        <motion.div
          key={pill.id}
          className={`absolute backdrop-blur-sm ${
            pill.type === 'molecule' 
              ? 'bg-purple-500/10 dark:bg-purple-300/10' 
              : pill.type === 'capsule'
              ? 'bg-sky-500/10 dark:bg-sky-300/10'
              : 'bg-indigo-500/10 dark:bg-indigo-300/10'
          }`}
          style={{
            width: pill.size,
            height: pill.type === 'capsule' ? pill.size * 2 : pill.size,
            left: `${pill.x}%`,
            top: `${pill.y}%`,
            borderRadius: pill.type === 'capsule' ? '9999px' : '30%',
            transform: `rotate(${pill.rotation}deg)`,
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [pill.rotation, pill.rotation + 360],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: pill.duration,
            repeat: Infinity,
            delay: pill.delay,
            ease: "linear",
          }}
        >
          {pill.type === 'molecule' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500/20 dark:bg-purple-300/20 rounded-full" />
              <div className="absolute w-full h-0.5 bg-purple-500/20 dark:bg-purple-300/20 rotate-45" />
              <div className="absolute w-full h-0.5 bg-purple-500/20 dark:bg-purple-300/20 -rotate-45" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}