import { connect } from 'react-redux'
// import auth from 'react-jwt-auth-redux'
import { browserHistory } from 'react-router'
import { message } from 'antd'
import { fetchAuth } from '../modules/login'

import WrappedLoginForm from '../components/Login'

const mapDispatchToProps = (dispatch, ownProps) => ({
	onLoginFormSubmit: (loginData) => {}
})

export default connect(false, mapDispatchToProps)(WrappedLoginForm)
