/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50:  '#fff7f0',
          100: '#ffedd9',
          200: '#ffd5ad',
          300: '#ffb87a',
          400: '#ff8f3f',
          500: '#f97316',
          600: '#ea6100',
          700: '#c44e00',
          800: '#9c3e00',
          900: '#7c3200',
        },
        cream: {
          50:  '#ffffff',
          100: '#fdfaf6',
          200: '#faf4ec',
          300: '#f5e8d5',
          400: '#eddcbd',
        },
        charcoal: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        serif: ['Italiana', 'Georgia', 'serif'],
        sans: ['Lato', 'Helvetica Neue', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'orange-glow': 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(255,255,255,0) 70%)',
      }
    },
  },
  plugins: [],
}
