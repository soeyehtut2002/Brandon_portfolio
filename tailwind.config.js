/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#e5c158',
          500: '#d4af37',
          600: '#b89228',
          700: '#94721c',
        },
        obsidian: {
          950: '#0a0b0d',
          900: '#0f1115',
          800: '#161920',
          700: '#212632',
          600: '#2f3545',
        },
        amberGold: '#E6C280',
        silkCream: '#F9F6F0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-glow': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(15,17,21,0) 70%)',
      }
    },
  },
  plugins: [],
}
