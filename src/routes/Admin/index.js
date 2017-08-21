import { injectReducer } from '../../store/reducers'
import userIsAuthenticated from 'vcms/RouterAuth'

export default (store) => ({
  path: 'admin',
  getComponent (nextState, next) {
    require.ensure([
      './containers/AdminContainer',
      './modules/admin'
    ], (require) => {
      const Admin = require('./containers/AdminContainer').default
      const adminReducer = require('./modules/admin').default
      injectReducer(store, {
        key: 'admin',
        reducer: adminReducer
      })

      next(null, userIsAuthenticated(Admin))
    })
  }
})