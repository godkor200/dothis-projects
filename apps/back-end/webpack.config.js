const path = require('path');
// ...

module.exports = {
  //...
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, './'), 'node_modules'],

    // path alias를 설정하는 부분
    alias: {
      '@Apps': path.resolve(__dirname, 'apps'),
      '@Libs': path.resolve(__dirname, 'libs'),
    },
  },
  //...
};
