/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // add your CDN domains here if using external CDN
      { protocol: "https", hostname: "**", pathname: "/**" }
    ]
  },
  experimental: {
    appDir: true
  }
};
module.exports = nextConfig;
