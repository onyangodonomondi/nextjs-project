import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        'accent-hover': 'var(--accent-hover)',
      },
      backgroundColor: {
        light: 'var(--light-background)',
      },
      textColor: {
        primary: 'var(--text-color)',
        light: 'var(--light-text)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      transitionProperty: {
        'all': 'var(--transition)',
      },
    },
  },
  plugins: [],
};

export default config; 