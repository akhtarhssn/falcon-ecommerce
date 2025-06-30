import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // API requests
      {
        source: '/api/:path*',
        destination: 'http://157.230.240.97:9999/api/:path*',
      },
      // Image requests (or static files)
      {
        source: '/media/:path*',
        destination: 'http://157.230.240.97:8888/storage/media/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '157.230.240.97',
        port: '8888',
        pathname: '/storage/media/**',
      },
    ],
  }
};

export default nextConfig;
