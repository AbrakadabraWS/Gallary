/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty',
  //       sharp: 'empty',
  //     }
  //   }
  //   return config
  // },

}

module.exports = nextConfig
