/** @type {import('tailwindcss').Config} */
import { personalColors } from "./src/Functions/colorHelpers/colorTWHelper"

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: personalColors,
    },
  },
  plugins: [],
}