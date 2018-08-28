export default (store) => ({
  path: '403',
  getComponent (nextState, next) {
    require.ensure([
      './containers/Error403Container'
    ], (require) => {
      const Error403 = require('./containers/Error403Container').default

      next(null, Error403)
    })
  }
})
