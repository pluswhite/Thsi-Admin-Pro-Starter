import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/ZoneListContainer.js',
      // './modules/userList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ZoneList = require('./containers/ZoneListContainer').default
      const ZoneListReducer = require('./modules/ZoneListModule').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'ZoneList',
        reducer: ZoneListReducer
      })
      // const userListReducer = require('./modules/userList').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'userSeller',
      //   reducer: userListReducer
      // })

      /*  Return getComponent   */
      next(null, ZoneList)
    })
  }
})
