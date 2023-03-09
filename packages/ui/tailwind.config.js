const theme = require('@dothis/theme/dashboard').default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{jsx,tsx}', './.storybook/**/*.{jsx,tsx}'],
  theme,
  plugins: [],
};
