// import { injectReducer } from 'vstore/reducers'
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
      // './modules/admin'
    ], (require) => {
      const Admin = require('./containers/AdminContainer').default
      // const adminReducer = require('./modules/admin').default
      // injectReducer(store, {
      //   key: 'admin',
      //   reducer: adminReducer
      // })

      next(null, userIsAuthenticated(Admin))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/Dashboard').default(store),
        require('./routes/Resources').default(store),
        require('./routes/Account').default(store),
        require('./routes/Role').default(store),
        // require('./routes/User').default(store),
        require('./routes/AdZones').default(store),
        require('./routes/Reports').default(store),
        require('./routes/Settings').default(store),
        require('./routes/Me').default(store),
        require('./routes/Message').default(store),
      ])
    })
  }
})
