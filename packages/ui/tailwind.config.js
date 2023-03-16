const { theme, utilityPlugin } = require('@dothis/theme/dashboard/index.js');

/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ['./src/components/**/*.{tsx}'],
  theme,
  plugins: [utilityPlugin],
};
