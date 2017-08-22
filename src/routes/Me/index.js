// import { injectReducer } from '../../store/reducers'
import userIsAuthenticated from 'vcms/RouterAuth'

export default (store, authRouteCheck) => ({
  path: 'Me',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./routes/Profile').default(store))
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/MeContainer',
      // './modules/Me'
    ], (require) => {
      const Me = require('./containers/MeContainer').default
      // const MeReducer = require('./modules/Me').default

      // injectReducer(store, {
      //   key: 'Me',
      //   reducer: MeReducer
      // })

      next(null, userIsAuthenticated(Me))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/Profile').default(store),
        require('./routes/Password').default(store),
      ])
    })
  }
})
