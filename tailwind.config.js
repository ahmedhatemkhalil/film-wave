/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '576px',
        'max-775px': { 'max': '775px' },
        'medium-lg': {'min': '768px', 'max': '1311px'},

      },
      backgroundImage: {

        'heroImage': "url('/src/assets/cover.jpg')",
      }

    },
  },
  plugins: [],
}

