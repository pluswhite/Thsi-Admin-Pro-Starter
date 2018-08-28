import { connect } from 'react-redux'
// import {
//   addNewCampaign,
//   fetchBannerAdsItemInfo
// } from '../../../modules/banner'

import NewCampaign from '../components/NewCampaign'

const mapStateToProps = (state) => ({
  // isLoading: state.bannerAds.isLoading,
  // adspaceBaseInfo: state.bannerAds.adspaceBaseInfo,
  // bannerInfo: state.bannerAds.bannerInfo
})

const mapDispatchToProps = {
  // addNewCampaign,
  // fetchBannerAdsItemInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign)
