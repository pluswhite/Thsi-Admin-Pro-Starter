// import { injectReducer } from 'vstore/reducers'
import {
  permissionIsAuthenticated
} from 'vcms/RouterAuth/RouterAuth'

export default (store) => ({
  path: 'campaign',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/CampaignList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/CampaignContainer',
      // './modules/Adspace'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Adspace = require('./containers/CampaignContainer').default
      // const AdspaceReducer = require('./modules/Adspace').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'Adspace',
      //   reducer: AdspaceReducer
      // })

      /*  Return getComponent   */
      next(null, permissionIsAuthenticated(Adspace))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/CampaignList').default(store),
        require('./routes/NewCampaign').default(store),
        require('./routes/EditCampaign').default(store),
      ])
    })
  }
})
