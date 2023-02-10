/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      width: {
        'w-85/100': '86%',
      },
    },
    fontSize: {
      small: ['10px', '14px'],
    },
    container: {
      padding: 0,
    },
    colors: {
      ...colors,
      componentBg: "#202029",
      componentBorder: "#FFFFFF14",
      itemBorder: "#454B50",
      inputBorder: "#344451",
      componentFocus: "#FFFFFF55",
      mainBoard: '#000417',
    },
    
  },
  plugins: [],
};
