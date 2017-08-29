import { injectReducer } from 'vstore/reducers'
import userIsAuthenticated from 'vcms/RouterAuth'

export default (store) => ({
  path: 'admin',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/Dashboard').default(store))
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/AdminContainer',
      './modules/admin'
    ], (require) => {
      const Admin = require('./containers/AdminContainer').default
      const adminReducer = require('./modules/admin').default
      injectReducer(store, {
        key: 'admin',
        reducer: adminReducer
      })

      next(null, userIsAuthenticated(Admin))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/Dashboard').default(store),
        require('./routes/Users').default(store),
        require('./routes/Reports').default(store),
        require('./routes/Lotto').default(store),
        require('./routes/Settings').default(store),
      ])
    })
  }
})
