import { connect } from 'react-redux'
// import {
//   fetchCampaignList,
//   fetchBannerAdsCode,
//   changeBannerAdsStatus,
// } from '../../../modules/banner'

import CampaignList from '../components/CampaignList'

const mapStateToProps = (state) => ({
  // isLoading: state.bannerAds.isLoading,
  // userList: state.bannerAds.userList,
  // bannerAdsCode: state.bannerAds.bannerAdsCode
})

const mapActionCreators = {
  // fetchCampaignList,
  // fetchBannerAdsCode,
  // changeBannerAdsStatus,
}

export default connect(mapStateToProps, mapActionCreators)(CampaignList)
