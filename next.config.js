module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/now-playing',
        permanent: false,
      },
    ]
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}
