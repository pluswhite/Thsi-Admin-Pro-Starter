import { injectReducer } from 'vstore/reducers'
import {
  permissionIsAuthenticated
} from 'vcms/RouterAuth/RouterAuth'

export default (store) => ({
  path: 'adzones',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/AdZonesList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/AdZonesContainer',
      './modules/adZones'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AdZones = require('./containers/AdZonesContainer').default
      const adZonesReducer = require('./modules/adZones').default

      /*  Add the reducer to the store on key 'AdZones'  */
      injectReducer(store, {
        key: 'adZones',
        reducer: adZonesReducer
      })

      /*  Return getComponent   */
      next(null, permissionIsAuthenticated(AdZones))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/AdZonesList').default(store),
        // require('./routes/NewAdZones').default(store),
        // require('./routes/EditAdZones').default(store),
      ])
    })
  }
})
