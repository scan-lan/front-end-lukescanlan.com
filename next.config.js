/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dev-lukescanlan.s3.eu-west-2.amazonaws.com",
      "prod-lukescanlan.s3.eu-west-2.amazonaws.com",
    ],
  },
}

module.exports = nextConfig
