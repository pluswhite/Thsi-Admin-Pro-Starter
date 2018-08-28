// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'new',
  getComponent (nextState, next) {
    require.ensure([
      './containers/NewCampaignContainer',
      // './modules/newCampaign'
    ], (require) => {
      const NewCampaign = require('./containers/NewCampaignContainer').default
      // const newCampaignReducer = require('./modules/newCampaign').default

      // injectReducer(store, {
      //   key: 'newCampaign',
      //   reducer: newCampaignReducer
      // })

      next(null, NewCampaign)
    })
  }
})
