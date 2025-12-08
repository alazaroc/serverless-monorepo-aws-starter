/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // AWS brand colors
        aws: {
          orange: '#FF9900',
          'dark-blue': '#232F3E',
          'light-blue': '#146EB4',
        },
      },
    },
  },
  plugins: [],
};
