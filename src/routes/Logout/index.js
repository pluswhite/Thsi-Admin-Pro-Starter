// import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'logout',
  getComponent (nextState, next) {
    require.ensure([
      './containers/LogoutContainer'
    ], (require) => {
      const Logout = require('./containers/LogoutContainer').default

      next(null, Logout)
    })
  }
})
