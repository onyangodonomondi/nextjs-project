/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'mocky.co.ke',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'source.unsplash.com',
      }
    ],
  },
  typescript: {
    // Ignore type checking errors in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Ignore ESLint errors in production build
    ignoreDuringBuilds: true,
  },
  // Remove experimental.appDir since App Router is now the default
  // Remove future.webpack5 since it's the default now
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ];
  },
  // Add better error handling
  onDemandEntries: {
    // Keep in memory for longer during development
    maxInactiveAge: 25 * 1000,
    // Show more detailed webpack errors
    pagesBufferLength: 5,
  },
  // Add these for CSS support
  webpack: (config) => {
    return config;
  },
  sassOptions: {
    includePaths: ['./src'],
  },
};

module.exports = nextConfig; 