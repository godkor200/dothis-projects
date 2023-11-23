module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 1,
      minimumVendorImplementations: 1,
      autoprefixer: true,
      features: {
        'nesting-rules': false,
      },
    },
    cssnano: {
      preset: 'default',
    },
  },
};
