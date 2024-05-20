module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["ru", "am"],
    defaultLocale: "ru",
  },
  experimental: {
    transpilePackages: ["ui"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*'
      }
    ]
  }
};
