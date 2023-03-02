module.exports = {
  ...require('@dothis/config/eslint-dothis-nestjs'),
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  root: true,
};
