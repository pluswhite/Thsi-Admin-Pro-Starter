/**
 * Mocks by mockjs
 */

module.exports = function () {
  var data = {
    // Common
    uploadFiles: require('./public/common/upload_files.js'),
    // Auth
    register: require('./public/auth/register.js'),
    login: require('./public/auth/login.js'),
    modifyPsw: require('./public/auth/modify_password.js'),
    resetPsw: require('./public/auth/reset_password.js'),
    validateToken: require('./public/auth/validate_token.js'),
    // Me
    msgList: require('./public/me/message_list.js'),
    profile: require('./public/me/profile.js'),

    // Admin
    // Dashboard
    dash: require('./public/dash/dash.js'),

    userList: require('./public/user/user_list.js'),

    // publishList: require('./public/publish/publish_list.js'),

    // Order
    // orderList: require('./public/order/order_list.js'),
    // Report
    // reportList: require('./public/reports/report_list.js'),
  }

  return data
}
