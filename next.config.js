/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source: '/api/auth/:path*',
        destination: "http://localhost:8080/auth/:path*",
      },
      {
        source: '/api/user/:path*',
        destination: "http://localhost:8080/user/:path*",
      }
    ]
  }
}

module.exports = nextConfig
