import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#EBE3D5',
        },
        stone: {
          light: '#EFECE6',
          DEFAULT: '#DCD7CF',
          dark: '#B8B2A7',
        },
        taupe: {
          DEFAULT: '#9E9689',
          dark: '#6A6357',
        },
        charcoal: {
          light: '#2E2D2B',
          DEFAULT: '#1E1D1B',
          dark: '#141312',
          deep: '#0D0D0C',
        },
        champagne: {
          light: '#D4BC9B',
          DEFAULT: '#BFA175',
          dark: '#9A7E56',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'editorial-tight': '-0.03em',
        'editorial': '0.12em',
        'editorial-wide': '0.22em',
        'editorial-widest': '0.32em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
