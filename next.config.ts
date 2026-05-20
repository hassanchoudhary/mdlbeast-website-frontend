import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // Local Strapi dev
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      // Strapi Cloud (API + Media CDN)
      { protocol: 'https', hostname: '*.strapiapp.com', pathname: '/**' },
      // Strapi on Railway
      { protocol: 'https', hostname: '*.railway.app', pathname: '/uploads/**' },
      // Strapi on Render
      { protocol: 'https', hostname: '*.onrender.com', pathname: '/uploads/**' },
      // Cloudinary
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
