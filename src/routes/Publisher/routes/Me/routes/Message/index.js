import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path : 'message',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Message = require('./containers/MessageContainer').default
      const reducer = require('./modules/message').default

      /*  Add the reducer to the store on key 'message'  */
      injectReducer(store, {
        key: 'message',
        reducer
      })

      /*  Return getComponent   */
      next(null, Message)

    /* Webpack named bundle   */
    })
  }
})
