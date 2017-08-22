import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/ProfileContainer',
      './modules/profile'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Profile = require('./containers/ProfileContainer').default
      const profileReducer = require('./modules/profile').default

      /*  Add the reducer to the store on key 'Profile'  */
      injectReducer(store, {
        key: 'profile',
        reducer: profileReducer
      })

      /*  Return getComponent   */
      next(null, Profile)
    })
  }
})
