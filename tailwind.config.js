/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#D6EFD8',
        'medium-green': '#80AF81',
        'dark-green': '#508D4E',
        'darker-green': '#1A5319',
      },
      container: {
        center: true,
        padding:"15px",
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
