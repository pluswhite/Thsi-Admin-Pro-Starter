import { connect } from 'react-redux'
import Header from 'vcms/Header'
import {
  siderChange,
  changeLanguage
} from 'vstore/settings'

const mapActionCreators = {
  siderChange,
  changeLanguage
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // siderCollapsed: state.settings.siderCollapsed,
  permissions: state.auth.permissions,
  userName: state.auth.userName,
  pathname: state.location.pathname
})

export default connect(mapStateToProps, mapActionCreators)(Header)
