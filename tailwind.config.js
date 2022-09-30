const colors = require('./node_modules/tailwindcss/colors')

const withAnimations = require('animated-tailwindcss')

const plugin = require('tailwindcss/plugin')

module.exports = withAnimations({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '4xl': {'min': '2010px'},
        // => @media (max-width: 2010px) { ... }
        '3xl': {'min': '1920px'},
        // => @media (max-width: 1920px) { ... }
        '2xl': {'min': '1535px'},
        // => @media (max-width: 1535px) { ... }
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
      },
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        lime: colors.lime,
        orange: colors.orange,
        slate: colors.slate,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        amber: colors.amber,
        emerald: colors.emerald,
        cyan: colors.cyan,
        sky: colors.sky,
        violet: colors.violet,
      },
      backgroundImage: {
        'slider-button': 'linear-gradient(#7EE249, #F2F047)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // will give every child the given style you put in the parent. e.g parent = child:hover:text-red-500, all children text-red-500
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('child-display', '& > *:display')
    },
  ],
})
