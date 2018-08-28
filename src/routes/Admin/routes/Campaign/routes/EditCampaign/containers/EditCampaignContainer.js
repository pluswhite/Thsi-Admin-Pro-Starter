import { connect } from 'react-redux'
// import {
//   updateEditCampaign,
//   fetchBannerAdsItemInfo
// } from '../../../modules/banner'

import EditCampaign from '../components/EditCampaign'

const mapStateToProps = (state) => ({
  isLoading: state.bannerAds.isLoading,
  guid: state.location.query.guid,
  adspaceBaseInfo: state.bannerAds.adspaceBaseInfo,
  bannerInfo: state.bannerAds.bannerInfo
})

const mapDispatchToProps = {
  // updateEditCampaign,
  // fetchBannerAdsItemInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaign)
