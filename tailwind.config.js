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
        'max-975': '975px',
        '530': '530px',
        '428': '428px',
        '1312': '1312px',
        'special-size': { 'min': '975px', 'max': '1023px' },
        'cast-size': { 'min': '723px', 'max': '767px' },


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

        'movie-cover': 'url("/src/assets/cover2.jpg")',
        'tv-cover': 'url("/src/assets/cover22.jpg")',
        'footer-cover': 'url("/src/assets/footer-bg.jpg")',
        'custom-grad': "linear-gradient(to top, #0f0f0f, #00000000)",

      }

    },
  },
  plugins: [],
}

