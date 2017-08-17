// import { injectReducer } from '../../store/reducers'

export default (store, authRouteCheck) => ({
  path: 'logout',
  // onEnter: (nextState, replace) => {
  //   authRouteCheck(nextState, replace, true, '/')
  // },
  getComponent (nextState, next) {
    require.ensure([
      './containers/LogoutContainer'
    ], (require) => {
      const Logout = require('./containers/LogoutContainer').default

      next(null, Logout)
    })
  }
})
