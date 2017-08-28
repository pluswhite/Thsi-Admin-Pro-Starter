// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'users',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/List').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/UsersContainer',
      // './modules/users'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Users = require('./containers/UsersContainer').default
      // const usersReducer = require('./modules/users').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'users',
      //   reducer: usersReducer
      // })

      /*  Return getComponent   */
      next(null, Users)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/List').default(store),
      ])
    })
  }
})
