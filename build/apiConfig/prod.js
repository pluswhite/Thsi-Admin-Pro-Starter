/**
 * Production API config.
 */

module.exports = {
  apiBaseUrl : '/mocks/',
  tokenName: 'vra-token',
  apiList: {
    auth: {
      register: 'auth/register.json',
      login: 'auth/login.json',
      validateToken: 'auth/validate_token.json'
    },
  }
}
