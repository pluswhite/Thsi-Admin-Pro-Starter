import { injectReducer } from 'vstore/reducers'
import {
  permissionIsAuthenticated
} from 'vcms/RouterAuth/RouterAuth'

export default (store) => ({
  path: 'account',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/AccountList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/AccountContainer',
      // './modules/accounts'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Account = require('./containers/AccountContainer').default
      const accountReducer = require('./modules/account').default

      /*  Add the reducer to the store on key 'Account'  */
      injectReducer(store, {
        key: 'accounts',
        reducer: accountReducer
      })

      /*  Return getComponent   */
      next(null, permissionIsAuthenticated(Account))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/AccountList').default(store),
        require('./routes/NewAccount').default(store),
        require('./routes/EditAccount').default(store),
      ])
    })
  }
})
