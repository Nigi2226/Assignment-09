/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#10b981', // Emerald 500
        'secondary-green': '#059669', // Emerald 600
        'light-bg': '#f0fdf4', // Green 50 for a calming design
      },
    },
  },
  plugins: [],
}