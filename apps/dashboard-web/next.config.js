const path = require('path');
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  transpilePackages: ['@dothis/share', "@dothis/ui", "@dothis/dto"],
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    outputFileTracingIgnores: ['**swc/core**'],
    appDir: true,
    typedRoutes: true,
  },

  compiler: {
    styledComponents: true,
  },


  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { icon: true, typescript: true, titleProp: true },
        },
      ],
    });

    return config;
  }
};
module.exports = config;
