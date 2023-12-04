/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    // For at slå fra caching fra pages
    // generateEtags: false,
    // headers: () => [
    //     {
    //         source: '/testing/:path*',
    //         headers: [
    //             {
    //                 key: 'Cache-Control',
    //                 value: 'no-store',
    //             },
    //         ],
    //     },
    // ],
  env: {
    AWS_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    AWS_SECRET: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    AWS_API_ENDPOINT: process.env.NEXT_PUBLIC_AWS_API_ENDPOINT
  },
  images: {
    domains: ['images.unsplash.com', 'static.thenounproject.com', 'assets.myntassets.com'],
  }
}

module.exports = nextConfig
