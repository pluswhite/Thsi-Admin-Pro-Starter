export default (store, authRouteCheck) => ({
  path: 'register',
  // onEnter: (nextState, replace) => {
  //   authRouteCheck(nextState, replace, false, '/')
  // },
  getComponent(nextState, next) {
    require.ensure([
      './containers/RegisterContainer'
    ], (require) => {
      const Register = require('./containers/RegisterContainer').default

      next(null, Register)
    })
  }
})
