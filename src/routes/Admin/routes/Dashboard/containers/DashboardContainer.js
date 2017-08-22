import { connect } from 'react-redux'
import { fetchDash } from '../modules/dashboard'

import Dashboard from '../components/Dashboard'

const mapStateToProps = (state) => ({
  isLoading: state.dashboard.isLoading,
  stats: state.dashboard.stats
})

const mapActionCreators = {
  fetchDash
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)
