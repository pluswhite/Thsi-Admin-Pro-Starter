import { connect } from 'react-redux'
// import { handlePassword } from 'vstore/auth'
import WrappedPasswordForm from '../components/Password'

const mapActionCreators = {
  // handlePassword
}

const mapStateToProps = (state) => ({
  // redirectPath: state.location.query.redirect
})

export default connect(mapStateToProps, mapActionCreators)(WrappedPasswordForm)
