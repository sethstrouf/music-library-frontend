/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        orange: colors.amber
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
