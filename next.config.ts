import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'authjs.dev',
      },
    ],
  },
};

export default nextConfig;
