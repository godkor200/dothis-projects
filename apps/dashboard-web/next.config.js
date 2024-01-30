const path = require('path');
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  images: {
    domains: ['bigkinds.or.kr', 'img.youtube.com'],
  },
  transpilePackages: [
    '@dothis/share',
    '@dothis/ui',
    '@dothis/dto',
    '@dothis/theme',
  ],
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    outputFileTracingExcludes: {
      '**swc/core**': true,
    },
    appDir: true,
    typedRoutes: true,
    esmExternals: 'loose',
    scrollRestoration: true,
    // scroll history역할로써 추가해줬지만, 동작하는지 안하는지 확인X.. (next 버전올려서 router scroll 이슈 해결하였습니다.)
    missingSuspenseWithCSRBailout: false,
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
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': path.resolve(__dirname, '../../dashboard-web/src'),
      '~/': path.resolve(__dirname, '../../dashboard-web'),
      '@dothis/share': path.resolve(__dirname, '../../packages/share'),
      '@dothis/ui': path.resolve(__dirname, '../../packages/ui'),
      '@dothis/dto': path.resolve(__dirname, '../../packages/dto'),
      '@dothis/theme': path.resolve(__dirname, '../../config/theme'),
    };

    return config;
  },
};
module.exports = config;
