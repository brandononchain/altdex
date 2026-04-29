import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { base: '#050505', soft: '#080A0B' },
        panel: { base: '#0B0E10', raised: '#101417' },
        border: { subtle: '#1A2228' },
        text: { primary: '#E8ECEF', muted: '#7A838A' },
        accent: { cyan: '#00E5FF', green: '#00FF85', red: '#FF3B3B', amber: '#FFB020' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace']
      },
      boxShadow: { panel: '0 0 0 1px rgba(0,0,0,0.4) inset' }
    }
  },
  plugins: []
};

export default config;
