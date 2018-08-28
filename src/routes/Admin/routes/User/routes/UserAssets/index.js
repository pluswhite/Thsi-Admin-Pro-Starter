import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'assets',
  getComponent(nextState, next) {
    require.ensure([
      './containers/UserAssetsContainer',
      './modules/UserAssetsModules'
    ], (require) => {
      const UserAssets = require('./containers/UserAssetsContainer').default
      const UserAssetsReducer = require('./modules/UserAssetsModules').default

      injectReducer(store, {
        key: 'userAssets',
        reducer: UserAssetsReducer
      })

      next(null, UserAssets)
    })
  }
})
