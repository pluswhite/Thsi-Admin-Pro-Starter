// import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'edit',
  getComponent (nextState, next) {
    require.ensure([
      './containers/EditCampaignContainer',
      // './modules/editCampaign'
    ], (require) => {
      const EditCampaign = require('./containers/EditCampaignContainer').default
      // const EditCampaignReducer = require('./modules/editCampaign').default

      // injectReducer(store, {
      //   key: 'editCampaign',
      //   reducer: EditCampaignReducer
      // })

      next(null, EditCampaign)
    })
  }
})
