/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/elements",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
