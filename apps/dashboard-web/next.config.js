const path = require('path');
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: { babel: false },
        },
      ],
    });

    // See https://github.com/TanStack/query/issues/3595#issuecomment-1353601727
    const aliasPackages = ['@tanstack/react-query'];

    if (options.isServer) {
      config.externals = [...aliasPackages, ...config.externals];
    }

    for (const aliasPackage of aliasPackages) {
      config.resolve.alias[aliasPackage] = path.resolve(
        __dirname,
        '../../node_modules',
        aliasPackage,
      );
    }
    // console.log(config.resolve.alias, 'config.resolve.alias');

    return config;
  },
  transpilePackages: ['@dothis/share'],
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    outputFileTracingIgnores: ['**swc/core**'],
    appDir: true,
    typedRoutes: true,
  },
};
module.exports = config;
