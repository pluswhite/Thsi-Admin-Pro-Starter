import { connect } from 'react-redux'
// import auth from 'react-jwt-auth-redux'
import { browserHistory } from 'react-router'
import { message } from 'antd'

import WrappedRegistrationForm from '../components/Register'

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleSignup: (loginData) => {
    // auth.signup(loginData)
    //   .then(() => {
    //     message.success('Register successfully!', 1.5, () => {
    //       browserHistory.push('/login')
    //     })
    //   })
    //   .catch(err => {
    //     // console.error(err)
    //     message.error(err)
    //   })
  }
})

export default connect(false, mapDispatchToProps)(WrappedRegistrationForm)
