const theme = require('../dist/dashboard/index.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{jsx,tsx}', './.storybook/**/*.{jsx,tsx}'],
  theme: theme.theme,
  plugins: [

    
  ],
};
