/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#fce7f3',
          DEFAULT: '#fbcfe8',
          dark: '#f9a8d4',
        },
        rose: {
          light: '#ffe4e6',
          DEFAULT: '#fecdd3',
          dark: '#fda4af',
        },
      },
    },
  },
  plugins: [],
}
