import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'zone',
  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/ZoneList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/index.js',
      // './modules/userList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Zone = require('./containers/index').default
      const reducer = require('./modules/index').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'zone',
        reducer: reducer
      })
      // const userListReducer = require('./modules/userList').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'userSeller',
      //   reducer: userListReducer
      // })

      /*  Return getComponent   */
      next(null, Zone)
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/ZoneList').default(store),
        require('./routes/NewZone').default(store),
        // require('./routes/EditZone').default(store),
      ])
    })
  }
})
