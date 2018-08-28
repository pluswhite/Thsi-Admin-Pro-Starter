export default (store) => ({
  path: '*',
  getComponent (nextState, next) {
    require.ensure([
      './containers/NoContentContainer'
    ], (require) => {
      const NoContent = require('./containers/NoContentContainer').default

      // injectReducer(store, {
      //   key: 'NoContent',
      //   reducer: NoContentReducer
      // })

      next(null, NoContent)
    })
  }
})
