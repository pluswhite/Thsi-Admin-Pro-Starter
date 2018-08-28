// import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'reset-psw',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ResetPasswordContainer'
    ], (require) => {
      const ResetPassword = require('./containers/ResetPasswordContainer').default

      next(null, ResetPassword)
    })
  }
})
