module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/now-watching',
        permanent: false,
      },
    ]
  },
}
