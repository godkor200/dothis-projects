module.exports = {
  ...require('@dothis/config/eslint-dothis-nextjs'),
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
