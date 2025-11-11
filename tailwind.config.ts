import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        fair: {
          blue: '#0074cc',
          navy: '#1a1a1a',
          gray: '#f4f4f4'
        }
      },
      boxShadow: {
        card: '0 12px 24px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
