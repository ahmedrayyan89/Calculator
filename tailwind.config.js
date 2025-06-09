/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c0ddff',
          300: '#80bbff',
          400: '#4d99ff',
          500: '#1a77ff',
          600: '#0055cc',
          700: '#003d99',
          800: '#002b66',
          900: '#001a33',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d1d8e5',
          300: '#a3b3cc',
          400: '#7187ac',
          500: '#4f6a93',
          600: '#385279',
          700: '#2b4162',
          800: '#1f2d45',
          900: '#121a29',
        },
        accent: {
          50: '#fff8f0',
          100: '#fff0e0',
          200: '#ffe0c0',
          300: '#ffc080',
          400: '#ffa040',
          500: '#ff8000',
          600: '#cc6600',
          700: '#994d00',
          800: '#663300',
          900: '#331a00',
        },
      },
      boxShadow: {
        'calculator': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      backdropBlur: {
        'calculator': '12px',
      },
    },
  },
  plugins: [],
};