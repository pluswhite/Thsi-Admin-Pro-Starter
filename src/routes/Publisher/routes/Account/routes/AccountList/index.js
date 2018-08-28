// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/AccountListContainer',
      // './modules/accountList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AccountList = require('./containers/AccountListContainer').default
      // const accountListReducer = require('./modules/accountList').default

      /*  Add the reducer to the store on key 'Account'  */
      // injectReducer(store, {
      //   key: 'bannerAds',
      //   reducer: accountListReducer
      // })

      /*  Return getComponent   */
      next(null, AccountList)
    })
  }
})
