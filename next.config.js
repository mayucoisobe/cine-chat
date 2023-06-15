/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: ['image.tmdb.org', 'source.unsplash.com'], // 外部APIから画像を取得
  },
  swcMinify: false,
};

module.exports = nextConfig;
