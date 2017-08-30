import { connect } from 'react-redux'
import { siderVisibleChange } from 'vstore/settings'
import { fetchSettings } from '../modules/settings'

import Settings from '../components/Settings'

const mapStateToProps = (state) => ({
  isLoading: state.setting.isLoading,
  siderVisible: state.settings.siderVisible
})

const mapActionCreators = {
  siderVisibleChange,
  fetchSettings
}

export default connect(mapStateToProps, mapActionCreators)(Settings)
