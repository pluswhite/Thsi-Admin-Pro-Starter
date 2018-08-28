// import { injectReducer } from 'vstore/reducers'
import userIsAuthenticated from 'vcms/RouterAuth'

export default (store) => ({
  path: 'publisher',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/Dashboard').default(store))
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/PublisherContainer',
      // './modules/admin'
    ], (require) => {
      const Publisher = require('./containers/PublisherContainer').default
      // const adminReducer = require('./modules/admin').default
      // injectReducer(store, {
      //   key: 'admin',
      //   reducer: adminReducer
      // })

      next(null, userIsAuthenticated(Publisher))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/Dashboard').default(store),
        require('./routes/Account').default(store),
        require('./routes/Role').default(store),
        // require('./routes/User').default(store),
        // require('./routes/Promote').default(store),
        // require('./routes/Publish').default(store),
        // require('./routes/Order').default(store),
        // require('./routes/Tags').default(store),
        // require('./routes/Reports').default(store),
        require('./routes/Settings').default(store),
        require('./routes/Me').default(store),
      ])
    })
  }
})
