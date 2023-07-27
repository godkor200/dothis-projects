const { theme, typography } = require('@dothis/theme/dashboard/index.js');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme,
  plugins: [typography],
};
