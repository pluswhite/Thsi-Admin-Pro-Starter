import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/LottoListContainer',
      './modules/lottoList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LottoList = require('./containers/LottoListContainer').default
      const lottoListReducer = require('./modules/lottoList').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'lottoList',
        reducer: lottoListReducer
      })

      /*  Return getComponent   */
      next(null, LottoList)
    })
  }
})
