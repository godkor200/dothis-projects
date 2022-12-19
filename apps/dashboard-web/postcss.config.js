const plugins = [
  ['postcss-import-ext-glob', {}],
  ['postcss-nested', {}],
  ['postcss-preset-env',{
    stage: 1,
    features: {
      'nesting-rules': false,
    },
    browsers: 'last 2 versions',
  }],
  ['autoprefixer', {}],
];

if(process.env.NODE_ENV === 'production') {
  plugins.push(['cssnano', {}]);
}

module.exports = {
  plugins,
}