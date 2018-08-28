// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/RoleListContainer',
      // './modules/roleList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const RoleList = require('./containers/RoleListContainer').default
      // const roleListReducer = require('./modules/roleList').default

      /*  Add the reducer to the store on key 'Role'  */
      // injectReducer(store, {
      //   key: 'bannerAds',
      //   reducer: roleListReducer
      // })

      /*  Return getComponent   */
      next(null, RoleList)
    })
  }
})
