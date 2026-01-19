/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm wood tones for banya theme
        'wood': {
          50: '#fdf8f0',
          100: '#f9eee0',
          200: '#f2ddbd',
          300: '#eacaa9',
          400: '#dcb58c',
          500: '#cfa26d', // Main wood tone
          600: '#b88d56',
          700: '#9a7442',
          800: '#7c5c34',
          900: '#604729',
        },
        // Steam and relaxation tones
        'steam': {
          50: '#f8fbfd',
          100: '#eef6fc',
          200: '#dcecf8',
          300: '#c7e0f2',
          400: '#a9d0ea',
          500: '#85bbdf', // Main steam tone
          600: '#639dc9',
          700: '#4d7da8',
          800: '#3d6387',
          900: '#32506d',
        },
        // Relaxing forest greens
        'forest': {
          50: '#f5f9f5',
          100: '#eaf3ea',
          200: '#d6e7d6',
          300: '#bedbbd',
          400: '#9ccca0',
          500: '#7ab07f', // Main forest green
          600: '#5d9462',
          700: '#45754b',
          800: '#345a3a',
          900: '#28452d',
        },
        // Warm banya accent colors
        'banya': {
          gold: '#d4af37',    // Gold accents
          brick: '#b22222',   // Brick red for traditional banya
          amber: '#ffbf00',   // Amber warmth
        },
        // New button color
        'button': {
          500: '#eec28e',     // Main button color
          600: '#d4a874',     // Darker button color
        }
      }
    },
  },
  plugins: [],
}