/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // NEXT_DIST_DIR lets a verification build run beside `next dev` without clobbering its `.next`
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.coe.int'
      }
    ],
    dangerouslyAllowSVG: true, 
  },
}

export default nextConfig;
