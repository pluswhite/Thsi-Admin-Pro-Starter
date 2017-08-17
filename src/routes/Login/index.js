import { injectReducer } from '../../store/reducers'

export default (store, authRouteCheck) => ({
  path: 'login',
  // onEnter: (nextState, replace) => {
  //   authRouteCheck(nextState, replace, false, '/')
  // },
  getComponent (nextState, next) {
    require.ensure([
      './containers/LoginContainer',
      // './modules/login'
    ], (require) => {
      const Login = require('./containers/LoginContainer').default
      // const loginReducer = require('./modules/login').default

      // injectReducer(store, {
      //   key: 'login',
      //   reducer: loginReducer
      // })

      next(null, Login)
    })
  }
})
