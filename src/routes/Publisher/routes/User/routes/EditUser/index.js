// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'edit',
  getComponent (nextState, next) {
    require.ensure([
      './containers/EditUserContainer',
      // './modules/editSeller'
    ], (require) => {
      const EditUser = require('./containers/EditUserContainer').default
      // const EditUserReducer = require('./modules/editSeller').default

      // injectReducer(store, {
      //   key: 'editSeller',
      //   reducer: EditUserReducer
      // })

      next(null, EditUser)
    })
  }
})
