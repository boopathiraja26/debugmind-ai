/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0B0F14',
          surface: '#121821',
          elevated: '#1A2230',
          border: '#232B38',
        },
        ink: {
          DEFAULT: '#E6EDF3',
          muted: '#8B98A5',
          faint: '#5A6572',
        },
        brand: {
          50: '#FEF8EC',
          100: '#FCEEC8',
          200: '#F9DD91',
          300: '#F7CC5F',
          400: '#F5B942',
          500: '#E7A62A',
          600: '#C0871E',
          700: '#966819',
        },
        fix: {
          DEFAULT: '#3DDC97',
          soft: '#12261F',
          text: '#7DF0BE',
        },
        bug: {
          DEFAULT: '#FF5D5D',
          soft: '#2A1416',
          text: '#FF9494',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245, 185, 66, 0.15), 0 8px 30px -8px rgba(245, 185, 66, 0.25)',
        card: '0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(11,15,20,0) 0%, #0B0F14 90%), radial-gradient(ellipse at top, rgba(245,185,66,0.08), transparent 60%)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
