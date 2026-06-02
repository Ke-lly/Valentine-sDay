/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#FDFBF7',
          DEFAULT: '#F5EFE6',
          dark: '#E8DFD0',
        },
        antiqueGold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          dark: '#AA7C11',
        },
        romantic: {
          pink: '#E8C5C8',
          lavender: '#DCD6F7',
          slateBlue: '#4A586E',
          waxRed: '#8B0000',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'Brush Script MT', 'cursive'],
      },
      animation: {
        'candle-flicker': 'candle 3s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        candle: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1) skewX(0deg)' },
          '50%': { opacity: 1, transform: 'scale(1.04) skewX(2deg)' },
          '75%': { opacity: 0.9, transform: 'scale(0.98) skewX(-1deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
};