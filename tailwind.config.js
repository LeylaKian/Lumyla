/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#050507',
        blush: '#0B0B10',
        brand: { DEFAULT: '#D4AF37', deep: '#B8860B' },
        mauve: '#C5A059',
        rose: '#9BA3AF',
        ivory: '#F4F0E8',
        ink: '#ECE8DF',
        muted: '#A6A199',
        digital: '#7665E8',
        white: '#101018',
      },
      fontFamily: {
        sans: [
          'Vazirmatn Variable',
          'Vazirmatn',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: { shell: '1360px' },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      boxShadow: {
        soft: '0 24px 60px -32px rgba(0, 0, 0, 0.8)',
        card: '0 34px 90px -44px rgba(0, 0, 0, 0.9)',
        lift: '0 44px 110px -50px rgba(0, 0, 0, 0.95)',
        glow: '0 0 90px rgba(212, 175, 55, 0.28)',
        gold: '0 18px 44px -20px rgba(212, 175, 55, 0.5)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        shimmer: 'shimmer 12s linear infinite',
      },
    },
  },
  plugins: [],
}
