/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      '2xl': {'min': '1920px'}, // this is to support your 23". Make sure your 15.6" screen is less than the min px value passed here
    },
  },
  plugins: [],
}
