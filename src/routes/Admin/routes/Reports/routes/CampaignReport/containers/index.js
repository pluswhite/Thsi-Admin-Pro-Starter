import { connect } from 'react-redux'
// import { fetchReport } from '../modules'
// import { getProvinceList, getCityList, getCampaignType } from '../../../modules/reports'

import CampaignReport from '../components'

const mapActionCreators = {
  // getProvinceList,
  // getCityList,
  // fetchReport,
  // getCampaignType
}

const mapStateToProps = state => ({
  isLoading: state.campaignReport.isLoading,
  // reportTotal: state.campaignReport.reportTotal,
  // reportList: state.campaignReport.reportList,
  // regionList: state.reports.regionList,
  // orderTypeList: state.reports.orderTypeList
})

export default connect(mapStateToProps, mapActionCreators)(CampaignReport)
