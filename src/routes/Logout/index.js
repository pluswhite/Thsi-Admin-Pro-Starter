// import { injectReducer } from '../../store/reducers'

export default (store, authRouteCheck) => ({
  path: 'logout',
  getComponent (nextState, next) {
    require.ensure([
      './containers/LogoutContainer',
      './modules/logout'
    ], (require) => {
      const Logout = require('./containers/LogoutContainer').default
      // const logoutReducer = require('./modules/logout').default

      // injectReducer(store, {
      //   key: 'logout',
      //   reducer: logoutReducer
      // })

      next(null, Logout)
    })
  }
})
