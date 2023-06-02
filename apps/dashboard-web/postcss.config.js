module.exports = {
  plugins: [
    "postcss-import",
    ["tailwindcss/nesting", "postcss-nested"],
    "tailwindcss",

    /** @type {import('postcss-preset-env').pluginOptions} **/
    [
      "postcss-preset-env",
      {
        stage: 1,
        minimumVendorImplementations: 1,
        autoprefixer: true,
        features: {
          "nesting-rules": false,
        },
      },
    ],
    process.env.NODE_ENV === "production"
        ? [
          "cssnano",
          {
            preset: "default",
          },
        ]
        : undefined,
  ],
};
