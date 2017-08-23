import { connect } from 'react-redux'
import { handleResetPassword } from 'vstore/auth'
import WrappedResetPasswordForm from '../components/ResetPassword'

const mapActionCreators = {
  handleResetPassword
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, mapActionCreators)(WrappedResetPasswordForm)
