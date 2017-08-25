import { connect } from 'react-redux'
import {
  fetchTotalReport,
  clearTotalReport
} from '../modules/totalReport'

import TotalReport from '../components/TotalReport'

const mapActionCreators = {
  fetchTotalReport,
  clearTotalReport
}

const mapStateToProps = (state) => ({
  isLoading: state.totalReport.isLoading,
  reportList: state.totalReport.reportList
})

export default connect(mapStateToProps, mapActionCreators)(TotalReport)
