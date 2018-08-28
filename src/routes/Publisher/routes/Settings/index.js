// import { injectReducer } from 'vstore/reducers'
import {
  permissionIsAuthenticated
} from 'vcms/RouterAuth/RouterAuth'

export default (store) => ({
  path: 'setting',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/SettingsContainer',
      // './modules/settings'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Settings = require('./containers/SettingsContainer').default
      // const settingsReducer = require('./modules/settings').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'setting',
      //   reducer: settingsReducer
      // })

      /*  Return getComponent   */
      next(null, permissionIsAuthenticated(Settings))
    })
  }
})
