import { connect } from 'react-redux'
import { fetchSettings } from '../modules/settings'

import Settings from '../components/Settings'

const mapStateToProps = (state) => ({
  isLoading: state.settings.isLoading,
  userList: state.settings.userList
})

const mapActionCreators = {
  fetchSettings
}

export default connect(mapStateToProps, mapActionCreators)(Settings)
