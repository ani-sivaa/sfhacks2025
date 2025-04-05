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
        'warm-beige': 'var(--warm-beige)',
        'soft-brown': 'var(--soft-brown)',
        'deep-maroon': 'var(--deep-maroon)',
        'healing-green': 'var(--healing-green)',
        'calm-blue': 'var(--calm-blue)',
        'dark-base': 'var(--dark-base)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;