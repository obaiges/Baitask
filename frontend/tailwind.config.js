/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode:'class',
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1100px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}