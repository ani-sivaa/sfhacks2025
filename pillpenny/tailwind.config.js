import { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'var(--neon-blue)',
        'neon-purple': 'var(--neon-purple)',
        'neon-green': 'var(--neon-green)',
        'cyber-dark': 'var(--cyber-dark)',
        'cyber-darker': 'var(--cyber-darker)',
        'cyber-light': 'var(--cyber-light)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue)',
        'neon-purple': '0 0 10px var(--neon-purple), 0 0 20px var(--neon-purple)',
        'neon-green': '0 0 10px var(--neon-green), 0 0 20px var(--neon-green)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 5px var(--neon-blue), 0 0 10px var(--neon-blue)'
          },
          '50%': { 
            textShadow: '0 0 15px var(--neon-blue), 0 0 30px var(--neon-blue)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;