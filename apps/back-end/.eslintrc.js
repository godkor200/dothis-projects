module.exports = {
  ...require('@dothis/config/eslint-dothis-nestjs.js'),
  root: true,
  parserOptions: {
    project: ['tsconfig.build.json'],
    createDefaultProgram: true,
  },
};
