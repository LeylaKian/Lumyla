/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF7F5',
        blush: '#F1E7E4',
        brand: { DEFAULT: '#350103', deep: '#2E0002' },
        mauve: '#905954',
        rose: '#CFB2A2',
        ivory: '#EFE2DA',
        ink: '#252127',
        muted: '#746C70',
        digital: '#7665E8',
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
        soft: '0 24px 60px -32px rgba(53, 1, 3, 0.28)',
        card: '0 34px 90px -44px rgba(46, 0, 2, 0.38)',
        lift: '0 44px 110px -50px rgba(46, 0, 2, 0.45)',
        glow: '0 0 90px rgba(207, 178, 162, 0.5)',
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
