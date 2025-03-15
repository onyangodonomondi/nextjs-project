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
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    // Ignore type checking errors in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Ignore ESLint errors in production build
    ignoreDuringBuilds: true,
  },
  // Move outputFileTracingExcludes to top level (not under experimental)
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
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
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // Much longer cache for images
            value: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
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
    // Disable side effects filtering to prevent any module loss
    if (config.optimization && config.optimization.sideEffects === true) {
      config.optimization.sideEffects = false;
    }
    return config;
  },
  sassOptions: {
    includePaths: ['./src'],
  },
  // Add redirects for old image paths
  async redirects() {
    return [
      {
        source: '/images/logos/:path*',
        destination: '/images/portfolio/logos/:path*',
        permanent: true,
      },
    ]
  },
  
  // Optimize output
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig; 