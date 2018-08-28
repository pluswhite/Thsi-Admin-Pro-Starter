import { connect } from 'react-redux'
import { fetchReport } from '../modules'
import { getProvinceList, getCityList, getOrderType } from '../../../modules/reports'

import OrderReport from '../components'

const mapActionCreators = {
  getProvinceList,
  getCityList,
  fetchReport,
  getOrderType
}

const mapStateToProps = state => ({
  isLoading: state.orderReport.isLoading,
  reportTotal: state.orderReport.reportTotal,
  reportList: state.orderReport.reportList,
  regionList: state.reports.regionList,
  orderTypeList: state.reports.orderTypeList
})

export default connect(mapStateToProps, mapActionCreators)(OrderReport)
