import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  handleLogin,
  handleLogout
} from 'vstore/auth'
import WrappedLoginForm from '../components/Login'

const mapActionCreators = {
  handleLogin,
  handleLogout
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  permissions: state.auth.permissions,
  isLoading: state.auth.isLoading,
  redirectPath: state.location.query.redirect
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(WrappedLoginForm))
