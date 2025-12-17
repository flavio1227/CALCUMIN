/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          blue: '#003247',
          yellow: '#FFD700'
        }
      },
    },
  },
  plugins: [],
};