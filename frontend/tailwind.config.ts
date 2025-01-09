/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lilac: '#FBEEFF',
        darkPurple: '#120E21',
        gradientStart: '#3A3A3A',
        gradientEnd: '#000000',
      },
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
        display: ['Red Hat Display', 'sans-serif'],
      },
      borderRadius: {
        large: '30px',
      },
    },
  },
  plugins: [],
};
