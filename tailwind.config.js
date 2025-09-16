/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBF7',
          100: '#FFF8F0',
          200: '#FFEEDD',
          300: '#FFE4CC',
          400: '#FFD9BB',
          500: '#FFCEAA',
        },
        sage: {
          50: '#F7FAF7',
          100: '#E8F4E8',
          200: '#D4E8D4',
          300: '#B8D8B8',
          400: '#9BC89B',
          500: '#7FB87F',
        },
        rose: {
          50: '#FDF2F2',
          100: '#F8E8E8',
          200: '#F0CCCC',
          300: '#E8B0B0',
          400: '#E09494',
          500: '#D87878',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};