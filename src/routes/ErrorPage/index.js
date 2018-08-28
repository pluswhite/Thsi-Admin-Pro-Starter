export default (store) => ({
  path: 'error',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/Error403').default(store))
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './components/ErrorPage'
    ], (require) => {
      const ErrorPage = require('./components/ErrorPage').default

      next(null, ErrorPage)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/Error500').default(store),
        require('./routes/Error403').default(store),
      ])
    })
  }
})
