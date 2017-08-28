import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  path: 'dashboard',
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/DashboardContainer',
      './modules/dashboard'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Dashboard = require('./containers/DashboardContainer').default
      const dashboardReducer = require('./modules/dashboard').default

      /*  Add the reducer to the store on key 'Dashboard'  */
      injectReducer(store, {
        key: 'dashboard',
        reducer: dashboardReducer
      })

      /*  Return getComponent   */
      next(null, Dashboard)
    })
  }
})
