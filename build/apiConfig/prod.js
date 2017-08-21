/**
 * Production API config.
 */

module.exports = {
  apiUrl : '/mocks/',
  authApiUrl: '/mocks/',
  tokenName: 'vra-token',
  api_list: {
    auth: {
      register: 'auth/register.json',
      login: 'auth/login.json',
      validate: 'auth/validate'
    },
  }
}
