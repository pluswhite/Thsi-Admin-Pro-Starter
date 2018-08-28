import { connect } from 'react-redux'
// import { fetchReport } from '../modules'
// import { getProvinceList, getCityList, getCreativeType } from '../../../modules/reports'

import CreativeReport from '../components'

const mapActionCreators = {
  // getProvinceList,
  // getCityList,
  // fetchReport,
  // getCreativeType
}

const mapStateToProps = state => ({
  isLoading: state.creativeReport.isLoading,
  // reportTotal: state.creativeReport.reportTotal,
  // reportList: state.creativeReport.reportList,
  // regionList: state.reports.regionList,
  // orderTypeList: state.reports.orderTypeList
})

export default connect(mapStateToProps, mapActionCreators)(CreativeReport)
