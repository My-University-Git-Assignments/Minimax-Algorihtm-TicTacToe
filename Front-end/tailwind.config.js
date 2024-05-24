/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        '3d': '0px 4px 8px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: theme => ({
        'piece-x': `radial-gradient(circle at 40%, ${theme('colors.quaternary')}, #000)`,
        'piece-o': `radial-gradient(circle at 40%, ${theme('colors.secondary')}, #000)`,
      }),
    },
    colors: {
      'primary': '#CCE6F4',
      'secondary': '#4BA3C3',
      'tertiary': '#175676', 
      'quaternary': '#BA324F',
    }
  },
  plugins: [],
}

