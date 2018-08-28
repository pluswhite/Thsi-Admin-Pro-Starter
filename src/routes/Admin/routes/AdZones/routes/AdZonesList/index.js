// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/AdZonesListContainer',
      // './modules/userList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AdZonesList = require('./containers/AdZonesListContainer').default
      // const userListReducer = require('./modules/userList').default

      /*  Add the reducer to the store on key 'AdZones'  */
      // injectReducer(store, {
      //   key: 'userSeller',
      //   reducer: userListReducer
      // })

      /*  Return getComponent   */
      next(null, AdZonesList)
    })
  }
})
