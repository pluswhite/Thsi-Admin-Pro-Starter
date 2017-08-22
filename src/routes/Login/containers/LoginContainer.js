import { connect } from 'react-redux'
import { handleLogin } from 'vstore/auth'
import WrappedLoginForm from '../components/Login'

const mapActionCreators = {
  handleLogin
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  redirectPath: state.location.query.redirect
})

export default connect(mapStateToProps, mapActionCreators)(WrappedLoginForm)
