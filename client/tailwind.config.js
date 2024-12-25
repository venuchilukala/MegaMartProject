/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "redish" : "#ff6868",
        'red': '#FF6868',
        'secondary': '#555',
        'primaryBg': '#3643ba'
      },
    },
  },
  plugins: [],
}

