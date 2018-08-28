import { injectReducer } from 'vstore/reducers'
import {
  permissionIsAuthenticated
} from 'vcms/RouterAuth/RouterAuth'

export default (store) => ({
  path: 'user',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/UserList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/UserContainer',
      './modules/user'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const User = require('./containers/UserContainer').default
      const userReducer = require('./modules/user').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'user',
        reducer: userReducer
      })

      /*  Return getComponent   */
      next(null, permissionIsAuthenticated(User))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/UserList').default(store),
        // require('./routes/NewUser').default(store),
        require('./routes/EditUser').default(store),
        require('./routes/UserAssets').default(store),
      ])
    })
  }
})
