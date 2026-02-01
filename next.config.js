/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/files/',
            outputPath: 'static/files/',
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig
