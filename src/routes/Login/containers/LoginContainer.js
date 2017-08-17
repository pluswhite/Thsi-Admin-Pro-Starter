import { connect } from 'react-redux'
// import auth from 'react-jwt-auth-redux'
import { handleLogin } from '../modules/login'

import WrappedLoginForm from '../components/Login'

const mapActionCreators = {
  handleLogin
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapActionCreators)(WrappedLoginForm)
