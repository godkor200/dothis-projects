module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting', 'postcss-nesting'),
    require('tailwindcss'),
    
    /** @type {import('postcss-preset-env').pluginOptions} **/
    require('postcss-preset-env')({
      stage: 2,
      browsers: ['cover 90%', 'not dead'],
      minimumVendorImplementations: 2,
      features: {
        autoprefixer: true,
        'nesting-rules': false,
      },
    }),
    process.env.NODE_ENV === 'production' &&
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
