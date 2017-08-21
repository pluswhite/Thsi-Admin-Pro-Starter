/**
 * Auth config.
 */
const devConfig = require('./dev')
const prodConfig = require('./prod')
const env = process.env.NODE_ENV || 'development'

const apiConfig = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development : devConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production : prodConfig,
}

module.exports = apiConfig[env]
