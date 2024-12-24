import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'authjs.dev',
      },
      {
        hostname: 'nextuipro.nyc3.cdn.digitaloceanspaces.com',
      },
    ],
  },
};

export default nextConfig;
