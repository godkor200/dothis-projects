const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@dothis/share']);

const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

/** @type {import('next').NextConfig} */
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    outputFileTracingIgnores: ['**swc/core**'],
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
    transpilePackages: ['@dothis/share'],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = withPlugins([withTM, withPWA], nextConfig);
