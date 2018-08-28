// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'edit',
  getComponent (nextState, next) {
    require.ensure([
      './containers/EditRoleContainer',
      // './modules/EditRole'
    ], (require) => {
      const EditRole = require('./containers/EditRoleContainer').default
      // const EditRoleReducer = require('./modules/EditRole').default

      // injectReducer(store, {
      //   key: 'EditRole',
      //   reducer: EditRoleReducer
      // })

      next(null, EditRole)
    })
  }
})
