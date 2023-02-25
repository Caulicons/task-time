/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
      },

      colors: {
        'primary': '#BAD7E9',
        'secondary': '#2B3467',
        'colorText': '#FCFFE7',
        'emphasize': '#EB455F'
      }
    },
  },
  plugins: [],
}
