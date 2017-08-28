import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/ListContainer',
      './modules/list'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const List = require('./containers/ListContainer').default
      const listReducer = require('./modules/list').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'list',
        reducer: listReducer
      })

      /*  Return getComponent   */
      next(null, List)
    })
  }
})
