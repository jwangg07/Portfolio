import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [{
      // Every optimized filename includes a content hash; changed images get a new URL.
      source: '/projects/optimized/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }]
  },
}

export default nextConfig
