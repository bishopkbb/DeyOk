/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
          light: '#FF8555',
        },
        secondary: {
          DEFAULT: '#5C4033',
          dark: '#3D2A22',
          light: '#6E5347',
        },
        accent: {
          DEFAULT: '#F4E8D0',
          dark: '#E8D9BD',
          light: '#F9F2E3',
        },
        success: '#2ECC71',
        warning: '#F39C12',
        danger: '#E74C3C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
