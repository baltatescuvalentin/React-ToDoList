/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max': '639px'},
      'xl': {'max': '1278px'},
    },
    extend: {
      keyframes: {
        goDown: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' }
        },
        goRight: {
          '0%': { transform: 'scaleX(0)'},
          '100%': { transform: 'scaleX(1)'}
        },
        goLeft: {
          '0%': { transform: 'scaleX(1)'},
          '100%': { transform: 'scaleX(0)'}
        }
      },
      animation: {
        goDownAnimation: 'goDown 1s ease-in-out forwards',
        goRightAnimation: 'goRight 1s ease-in forwards',
        goLeftAnimation: 'goLeft 1s ease-in forwards',
      }
    },
  },
  plugins: [],
}
