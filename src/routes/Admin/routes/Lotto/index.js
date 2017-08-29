// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'lotto',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/LottoList').default(store))
    })
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/LottoContainer',
      // './modules/lotto'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Lotto = require('./containers/LottoContainer').default
      // const lottoReducer = require('./modules/lotto').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'lotto',
      //   reducer: lottoReducer
      // })

      /*  Return getComponent   */
      next(null, Lotto)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/LottoList').default(store),
      ])
    })
  }
})
