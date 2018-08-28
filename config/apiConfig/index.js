/**
 * Auth config.
 */
const devConfig = require('./dev')
const preDevConfig = require('./pre_dev')
const preTestConfig = require('./pre_test')
const prodConfig = require('./prod')
const env = process.env.NODE_ENV || 'development'
// console.log(env)

const apiConfig = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: devConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'predev'
  // ======================================================
  predev: preDevConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'pretest'
  // ======================================================
  pretest: preTestConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: prodConfig
}

module.exports = apiConfig[env]
