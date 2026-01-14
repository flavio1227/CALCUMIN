/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          blue: '#FFFFFF',      // NUEVO: blanco | ORIGINAL: '#003247'
          yellow: '#1F2937'     // NUEVO: gris oscuro | ORIGINAL: '#FFD700'
        }
      },
    },
  },
  plugins: [],
};