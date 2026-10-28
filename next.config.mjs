/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
}
