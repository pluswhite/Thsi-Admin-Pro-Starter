import { connect } from 'react-redux'
import { fetchData } from '../modules/dashboard'

import Dashboard from '../components/'

const mapStateToProps = state => ({
  ...state.dashboard
})

const mapActionCreators = {
  fetchData
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)
