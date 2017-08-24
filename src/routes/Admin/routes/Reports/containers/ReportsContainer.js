import { connect } from 'react-redux'
import { fetchReports } from '../modules/reports'

import Reports from '../components/Reports'

const mapStateToProps = (state) => ({
  isLoading: state.reports.isLoading,
  userList: state.reports.userList
})

const mapActionCreators = {
  fetchReports
}

export default connect(mapStateToProps, mapActionCreators)(Reports)
