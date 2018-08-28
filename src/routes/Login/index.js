// import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'login',
  getComponent (nextState, next) {
    require.ensure([
      './containers/LoginContainer'
    ], (require) => {
      const Login = require('./containers/LoginContainer').default

      next(null, Login)
    })
  }
})
