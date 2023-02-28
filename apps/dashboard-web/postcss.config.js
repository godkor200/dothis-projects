const plugins = [
  ['postcss-import-ext-glob', {}],
  [
    'postcss-preset-env',
    {
      stage: 1,
      features: {
        'nesting-rules': false,
      },
      browsers: 'last 2 versions',
    },
  ],
  ['tailwindcss/nesting', {}],
  ['tailwindcss', {}],
  ['autoprefixer', {}],
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(['cssnano', {}]);
}

module.exports = {
  plugins,
};
