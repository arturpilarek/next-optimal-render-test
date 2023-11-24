/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AWS_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    AWS_SECRET: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  },
  images: {
    domains: ['images.unsplash.com', 'static.thenounproject.com'],
  }
}

module.exports = nextConfig
