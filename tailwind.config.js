/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        anoria: {
          radiating: {
            from: '#00FF87',
            to: '#00D9FF',
          },
          focused: {
            from: '#0066FF',
            to: '#9933FF',
          },
          scattered: {
            from: '#FF3B30',
            to: '#FF9500',
          },
          calm: {
            from: '#007AFF',
            to: '#5AC8FA',
          },
          energized: {
            from: '#FFD60A',
            to: '#32D74B',
          },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(400px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
