import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        marino: {
          DEFAULT: '#0A1F44',
          50: '#E8EBF2',
          100: '#C5CDE0',
          200: '#9FACC9',
          300: '#788BB2',
          400: '#5A709F',
          500: '#3D558D',
          600: '#2A3F72',
          700: '#1A2C56',
          800: '#0A1F44',
          900: '#050F22',
        },
        amarillo: {
          DEFAULT: '#FFC107',
          50: '#FFF9E6',
          100: '#FFEEB3',
          200: '#FFE380',
          300: '#FFD84D',
          400: '#FFCE26',
          500: '#FFC107',
          600: '#D9A400',
          700: '#B38600',
          800: '#8C6900',
          900: '#664C00',
        },
      },
    },
  },
}

export default config
