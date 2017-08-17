export default (store) => ({
  path: '*',
  getComponent (nextState, next) {
    require.ensure([
      './components/NoContent'
    ], (require) => {
      const NoContent = require('./components/NoContent').default

      // injectReducer(store, {
      //   key: 'NoContent',
      //   reducer: NoContentReducer
      // })

      next(null, NoContent)
    })
  }
})
