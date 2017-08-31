import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { handleLogin } from 'vstore/auth'
import WrappedLoginForm from '../components/Login'

const mapActionCreators = {
  handleLogin
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  redirectPath: state.location.query.redirect
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(WrappedLoginForm))
