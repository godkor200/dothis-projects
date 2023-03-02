const opts = require('@dothis/config/eslint-dothis-nextjs');

module.exports = {
  ...opts,
  root: true,
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
