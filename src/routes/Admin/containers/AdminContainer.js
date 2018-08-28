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

import admin from '../components/Admin'

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
  siderVisible: state.settings.siderVisible,
  // siderCollapsed: state.settings.siderCollapsed,
  userName: state.auth.userName,
  pathname: state.location.pathname
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(admin))
