/** @type {import('next').NextConfig} */

const path = require('path');

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const config = {
  reactStrictMode: false,
  swcMinify: true,

  // 해당 부분 intercepting route 랑 문제가 있어서 임시 주석처리 (next 아직도 안고쳤다.)
  // i18n: {
  //   locales: ['ko'],
  //   defaultLocale: 'ko',
  // },

  images: {
    domains: [
      'bigkinds.or.kr',
      'img.youtube.com',
      'yt3.ggpht.com',
      'yt3.googleusercontent.com',
      // 현재 유튜브 썸네일 이미지의 가운데 주소가 계속 가변하는 형태를 보인다, 하지만 next config에서는 정규표현식이 사용불가인데,  따라서 이미지 로더를 생성해야하나 고민중
    ],
  },
  transpilePackages: [
    '@dothis/share',
    '@dothis/ui',
    '@dothis/dto',
    '@dothis/theme',
  ],

  // runtime:'edge',
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    // outputFileTracingExcludes: {
    //   '**swc/core**': true,
    // },

    // appDir 제거 = appDir 디폴트 설정 13.4.
    typedRoutes: true,
    esmExternals: 'loose',
    scrollRestoration: true,
    // scroll history역할로써 추가해줬지만, 동작하는지 안하는지 확인X.. (next 버전올려서 router scroll 이슈 해결하였습니다.)
    missingSuspenseWithCSRBailout: false,
    // 빌드 에러로 인한 옵션 추가 [관련 링크](https://blog.maxam.dev/use-search-params-should-be-wrapped-in-a-suspense-boundary)
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

  async rewrites() {
    return [
      {
        source: '/v1/search',
        destination: 'https://openapi.naver.com/v1/datalab/search',
      },
    ];
  },
};
module.exports = withVanillaExtract(config);
