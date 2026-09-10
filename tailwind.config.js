/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EA',
        ink: '#141311',
        clay: '#E8560F',
        clayDark: '#C2440A',
        moss: '#3E7A4C',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        thick: '6px 6px 0 0 #141311',
        thickSm: '4px 4px 0 0 #141311',
      },
    },
  },
  plugins: [],
}
