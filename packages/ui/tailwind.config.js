const dashboard = require('@dothis/theme/dashboard/index.js');

/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ['./src/components/**/*.tsx'],
 
  plugins: [],
  theme: dashboard.theme,
};
