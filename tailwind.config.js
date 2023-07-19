/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quickSand: ["quicksand", "sans-serif"],
        poppins:["poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}