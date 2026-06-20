import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#020617',
          panel: '#0f172a',
          line: '#1e293b',
          glow: '#22d3ee'
        }
      },
      boxShadow: {
        studio: '0 30px 80px -32px rgba(34, 211, 238, 0.28)'
      },
      backgroundImage: {
        'studio-grid': 'radial-gradient(circle at top, rgba(34,211,238,0.16), transparent 42%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
      },
      backgroundSize: {
        'studio-grid': 'auto, 40px 40px, 40px 40px'
      }
    }
  },
  plugins: []
};

export default config;
