// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'new',
  getComponent (nextState, next) {
    require.ensure([
      './containers/NewAccountContainer',
      // './modules/NewAccount'
    ], (require) => {
      const NewAccount = require('./containers/NewAccountContainer').default
      // const NewAccountReducer = require('./modules/NewAccount').default

      // injectReducer(store, {
      //   key: 'NewAccount',
      //   reducer: NewAccountReducer
      // })

      next(null, NewAccount)
    })
  }
})
