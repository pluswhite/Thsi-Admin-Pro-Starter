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
      validateToken: 'auth/validate_token.json',
      modifyPsw: 'auth/modify_password.json',
      resetPsw: 'auth/reset_password.json'
    },
    me: {
      profile: 'me/profile.json',
    },
    dash: {
      index: 'dash/dash.json'
    },
    users: {
      index: 'users/userList.json'
    },
    reports: {
      index: 'reports/reportList.json'
    }
  }
}
