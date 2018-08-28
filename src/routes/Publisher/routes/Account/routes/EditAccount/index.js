// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'edit',
  getComponent (nextState, next) {
    require.ensure([
      './containers/EditAccountContainer',
      // './modules/EditAccount'
    ], (require) => {
      const EditAccount = require('./containers/EditAccountContainer').default
      // const EditAccountReducer = require('./modules/EditAccount').default

      // injectReducer(store, {
      //   key: 'EditAccount',
      //   reducer: EditAccountReducer
      // })

      next(null, EditAccount)
    })
  }
})
