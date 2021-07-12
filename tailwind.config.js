const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      'Adobe Jenson Pro': ['Adobe Jenson Pro'],
      'Acumin Pro': ['Acumin Pro']
    },
    screens: {
      sm: {'max': "576px" },
      md: {'max': "768px" },
      lg: {'max': "992px" },
      xl: {'max': "1200px" },
      xxl: {'max': "1400px" }
    },
    fontSize: {
      'font-xxxs': '10px',
      'font-xxs': '14px',
      'font-link': '18px',
      'font-xs': '24px',
      'font-sm': '28px',
      'font-md': '42px',
      'font-lg': '60px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}