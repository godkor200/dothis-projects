const { theme, utilityPlugin } = require('@dothis/theme/dashboard/index.js');

/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ['./src/components/**/*.{jsx,tsx}', './.storybook/**/*.{jsx,tsx}'],
  theme,
  plugins: [utilityPlugin],
};
