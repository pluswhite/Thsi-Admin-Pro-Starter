import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'role',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/RoleList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/RoleContainer',
      // './modules/Roles'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Role = require('./containers/RoleContainer').default
      const RoleReducer = require('./modules/role').default

      /*  Add the reducer to the store on key 'Role'  */
      injectReducer(store, {
        key: 'role',
        reducer: RoleReducer
      })

      /*  Return getComponent   */
      next(null, Role)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/RoleList').default(store),
        require('./routes/NewRole').default(store),
        require('./routes/EditRole').default(store),
      ])
    })
  }
})
