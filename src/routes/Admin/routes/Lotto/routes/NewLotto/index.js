import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'new',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/NewLottoContainer',
      './modules/newLotto'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const NewLotto = require('./containers/NewLottoContainer').default
      const newLottoReducer = require('./modules/newLotto').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'newLotto',
        reducer: newLottoReducer
      })

      /*  Return getComponent   */
      next(null, NewLotto)
    })
  }
})
