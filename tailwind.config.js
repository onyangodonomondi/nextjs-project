/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2647', // Deep navy blue
          light: 'rgba(10, 38, 71, 0.1)',
        },
        secondary: {
          DEFAULT: '#144272', // Rich navy blue
          light: 'rgba(20, 66, 114, 0.1)',
        },
        accent: {
          DEFAULT: '#205295', // Bright navy blue
          hover: '#2C74B3', // Lighter navy blue for hover states
          light: 'rgba(32, 82, 149, 0.1)',
        },
        navy: {
          50: '#E5F0FF',
          100: '#B3D1FF',
          200: '#80B3FF',
          300: '#4D94FF',
          400: '#1A75FF',
          500: '#0052CC',
          600: '#003D99',
          700: '#002966',
          800: '#001433',
          900: '#000A1A',
        }
      },
      backgroundColor: {
        'accent-hover': 'var(--accent-hover)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px',
          '2xl': '1496px',
        },
      },
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.shape': {
          '@apply absolute rounded-full mix-blend-multiply filter blur-xl opacity-70': {},
        },
        '.shape-1': {
          '@apply w-72 h-72 -top-10 -right-10': {},
          'background-color': 'rgba(32, 82, 149, 0.6)',
          'animation': 'float 8s infinite',
        },
        '.shape-2': {
          '@apply w-96 h-96 top-1/2 right-1/4': {},
          'background-color': 'rgba(20, 66, 114, 0.6)',
          'animation': 'float 12s infinite',
        },
        '.shape-3': {
          '@apply w-80 h-80 bottom-1/4 right-1/3': {},
          'background-color': 'rgba(10, 38, 71, 0.6)',
          'animation': 'float 10s infinite',
        },
        '.service-card': {
          '@apply relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden': {},
        },
        '.service-card::before': {
          'content': "''",
          '@apply absolute inset-0 opacity-0 transition-all duration-500': {},
          'background': 'linear-gradient(to bottom right, rgba(10, 38, 71, 0.1), rgba(32, 82, 149, 0.1))',
        },
        '.service-card:hover::before': {
          '@apply opacity-100': {},
        },
        '.service-card .icon-wrapper': {
          '@apply relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 z-10': {},
          'background-color': 'rgba(10, 38, 71, 0.1)',
        },
      });
    }),
  ],
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'from-primary',
    'to-accent',
    {
      pattern: /^(bg|from|to)-(primary|secondary|accent|navy)(-light)?$/,
    },
    {
      pattern: /^(bg|from|to)-(primary|secondary|accent|navy)\/[0-9]+$/,
    },
    {
      pattern: /^opacity-[0-9]+$/,
    },
  ],
}

