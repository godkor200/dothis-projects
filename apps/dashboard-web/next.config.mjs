// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

import nextPWA from 'next-pwa'

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko", 
  },
  experimental: {
    appDir: true,
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
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // runtimeCaching,
  },
  compiler:{
    emotion: true,
  }
};
export default nextPWA(config);
