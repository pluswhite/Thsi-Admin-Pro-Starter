// import { injectReducer } from 'vstore/reducers'
import {
  permissionIsAuthenticated
} from 'vcms/RouterAuth/RouterAuth'

export default (store) => ({
  path: 'resources',
  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/Zone').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/ResourcesContainer',
      // './modules/users'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Resources = require('./containers/ResourcesContainer').default

      /*  Return getComponent   */
      next(null, permissionIsAuthenticated(Resources))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/Zone').default(store),
        require('./routes/MobileZone').default(store),
        // require('./routes/Template').default(store)
      ])
    })
  }
})
