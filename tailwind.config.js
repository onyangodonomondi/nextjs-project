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
          DEFAULT: "#0A2647",
          dark: "#051a33",
          light: "#1a3a6d",
        },
        secondary: {
          DEFAULT: "#FF5400",
          dark: "#cc4300",
          light: "#ff7633",
        },
        accent: {
          DEFAULT: "#205295",
          dark: "#174176",
          light: "#2a63a7",
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
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'noise': "url('/noise.png')", // Add a subtle noise texture image
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
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0) rotate(0)',
          },
          '25%': {
            transform: 'translateY(-10px) rotate(1deg)',
          },
          '75%': {
            transform: 'translateY(10px) rotate(-1deg)',
          },
        },
        'spin-reverse': {
          '100%': { transform: 'rotate(-360deg)' },
        },
        move: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
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

