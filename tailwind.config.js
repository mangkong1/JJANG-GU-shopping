/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'white90': '#fff9',
      'gray200': '#cfcfcf',
      'gray400': '#8B8B8B',
      'gray500': '#545454',
      'red': '#F13737',
      'yellow': '#FCD973',
      'test': '#97caf6',
      'test1': '#fff7c8',
    },
    backgroundImage: {
      'banner_1': "url('./public/imgs/banner_1.svg')",
      'banner_2': "url('./public/imgs/banner_2.svg')",
    }
  },
  plugins: [],
}
