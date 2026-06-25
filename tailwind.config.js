/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark glassmorphism palette (WeatherView reference)
        night: {
          900: '#0b1020',
          800: '#11162a',
          700: '#1a2138',
        },
        accent: {
          400: '#8b9bff',
          500: '#6d7cff',
          600: '#5a67ec',
        },
        sun: '#f5b942',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};
