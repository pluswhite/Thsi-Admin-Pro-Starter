// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/CampaignListContainer',
      // './modules/userList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CampaignList = require('./containers/CampaignListContainer').default
      // const userListReducer = require('./modules/userList').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'bannerAds',
      //   reducer: userListReducer
      // })

      /*  Return getComponent   */
      next(null, CampaignList)
    })
  }
})
