const withPWA = require('next-pwa')({
  dest: 'public',
});

const runtimeCaching = require('next-pwa/cache');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // runtimeCaching,
  },
  experimental: {
    transpilePackages: ['@dothis/share'],
  },
};

module.exports = withPWA(nextConfig);
