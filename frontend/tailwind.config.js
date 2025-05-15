/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1100px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '28px',
      '5xl': '32px',
      '6xl': '36px',
    }
  },
  plugins: [],
}