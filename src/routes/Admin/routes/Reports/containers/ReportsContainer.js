import { connect } from 'react-redux'
// import { fetchReports } from '../modules/reports'

import Reports from '../components/Reports'

const mapStateToProps = (state) => ({
  // isLoading: state.reports.isLoading,
  // reportList: state.reports.reportList
})

const mapActionCreators = {
  // fetchReports
}

export default connect(mapStateToProps, mapActionCreators)(Reports)
