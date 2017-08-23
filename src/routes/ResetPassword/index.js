// import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'reset-psw',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ResetPasswordContainer',
      // './modules/resetPassword'
    ], (require) => {
      const ResetPassword = require('./containers/ResetPasswordContainer').default
      // const resetPasswordReducer = require('./modules/resetPassword').default

      // injectReducer(store, {
      //   key: 'resetPassword',
      //   reducer: resetPasswordReducer
      // })

      next(null, ResetPassword)
    })
  }
})
