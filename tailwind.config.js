/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A00E5',
        primarySubtle: '#F7F5FF',
        secondary: '#000000',
        secondarySubtle: '#FFFFFF',
        normal: '#19191B',
        subtleDark: '#61646B',
        subtleLight: '#AFB1B6',
        bg: '#EFEFF0',
        surface: '#FAFAFA',
      },
      fontFamily: {
        worksans: 'Work Sans, sans-serif',
      },
    },
  },
  plugins: [],
};
