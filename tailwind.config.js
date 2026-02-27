/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        brutal: {
          bg: '#0a0a0a',
          fg: '#f2f2f2',
          card: '#1a1a1a',
          blue: '#049cd8',
          green: '#43b047',
          yellow: '#fbd000',
          red: '#e52521',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

