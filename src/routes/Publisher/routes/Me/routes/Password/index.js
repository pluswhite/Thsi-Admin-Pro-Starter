// import { injectReducer } from '../../store/reducers'

export default (store, authRouteCheck) => ({
  path: 'password',
  // onEnter: (nextState, replace) => {
  //   authRouteCheck(nextState, replace, false, '/')
  // },
  getComponent (nextState, next) {
    require.ensure([
      './containers/PasswordContainer',
      // './modules/password'
    ], (require) => {
      const Password = require('./containers/PasswordContainer').default
      // const passwordReducer = require('./modules/password').default

      // injectReducer(store, {
      //   key: 'password',
      //   reducer: passwordReducer
      // })

      next(null, Password)
    })
  }
})
