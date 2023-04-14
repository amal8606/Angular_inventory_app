/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
      "main":"url('https://c8.alamy.com/comp/2D7NW07/hand-of-businessman-holding-inventory-management-inscription-business-success-concept-2D7NW07.jpg')"
    },
  },
    screens: {
      '2xl': {'min': '1920px'}
    },
  },
  plugins: [],
}
