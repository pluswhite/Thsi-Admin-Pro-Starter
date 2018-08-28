// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'new',
  getComponent (nextState, next) {
    require.ensure([
      './containers/NewRoleContainer',
      // './modules/NewRole'
    ], (require) => {
      const NewRole = require('./containers/NewRoleContainer').default
      // const NewRoleReducer = require('./modules/NewRole').default

      // injectReducer(store, {
      //   key: 'NewRole',
      //   reducer: NewRoleReducer
      // })

      next(null, NewRole)
    })
  }
})
