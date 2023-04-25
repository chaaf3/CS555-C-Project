/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
];
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
