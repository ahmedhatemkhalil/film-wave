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
        'medium-lg': { 'min': '768px', 'max': '1311px' },
        'md-363': '363px',
        'max-975': '975px'

      },
      width: {
        '55': '55%',
        '22': '22%',
        '85': '85%',
        '35': '35%',
        '65': '65%',
      },
      colors: {
        'mainColor': '#0080ff'
      },
      backgroundImage: {

        'heroImage': "url('/src/assets/cover.jpg')",
        'movies': "url('/src/assets/cover 2.jpg')",
        'series': "url('/src/assets/cover22.jpg')",
        'custom-grad': "linear-gradient(to top, #0f0f0f, #00000000)",
        'poster1': "url('/src/assets/poster3.jpg)",
        'poster2': "url('/src/assets/poster-3.jpg)",
      }

    },
  },
  plugins: [],
}

