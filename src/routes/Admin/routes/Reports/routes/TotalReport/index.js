import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path : 'total',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const TotalReport = require('./containers/TotalReportContainer').default
      const reducer = require('./modules/totalReport').default

      /*  Add the reducer to the store on key 'totalReport'  */
      injectReducer(store, {
        key: 'totalReport',
        reducer
      })

      /*  Return getComponent   */
      next(null, TotalReport)

    /* Webpack named bundle   */
    })
  }
})
