/**
 * @type {import('next').NextConfig}
 */
const withTM = require('next-transpile-modules')(['@dothis/share']);
// const nextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     transpilePackages: ['@dothis/share'],
//   },
//};
const nextConfig = withTM({
  reactStrictMode: true,
  // serverComponentsExternalPackages: ['@prisma/client'],
  // webpack: (config) => {
  //   config.externals = [...(config.externals || []), '@prisma/client'];
  //   // Important: return the modified config
  //   return config;
  // },
  // experimental: {
  //   // appDir: true,
  //   serverComponentsExternalPackages: ['@prisma/client'],
  // },
  // experimental: {
  // Enables hot-reload and easy integration for local packages
  // serverComponentsExternalPackages: ['@prisma/client'],
  // transpilePackages: ['@dothis/share', '@dothis/config'],
  // },
});

module.exports = nextConfig;
