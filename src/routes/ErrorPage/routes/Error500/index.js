export default (store) => ({
  path: '500',
  getComponent (nextState, next) {
    require.ensure([
      './containers/Error500Container'
    ], (require) => {
      const Error500 = require('./containers/Error500Container').default

      next(null, Error500)
    })
  }
})
