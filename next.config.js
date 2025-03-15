/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'mocky.co.ke'],
    unoptimized: false,
  },
};

module.exports = nextConfig; 