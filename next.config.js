/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "fdingler-image-classification.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "**",
      }
    ]
  }
}

module.exports = nextConfig
