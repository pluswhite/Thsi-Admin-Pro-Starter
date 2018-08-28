import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  handleValidateToken,
  handleLogout
} from 'vstore/auth'
import { siderChange } from 'vstore/settings'

// import {
//   fetchadmin
// } from '../modules/admin'

import admin from '../components/Publisher'

const mapActionCreators = {
  handleValidateToken,
  handleLogout,
  siderChange
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  permissions: state.auth.permissions,
  siderCollapsed: state.settings.siderCollapsed,
  siderVisible: state.settings.siderVisible
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(admin))
