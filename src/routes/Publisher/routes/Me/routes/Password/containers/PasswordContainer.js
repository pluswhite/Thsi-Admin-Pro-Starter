import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  handleModifyPassword,
  handleLogout
} from 'vstore/auth'
import WrappedPasswordForm from '../components/Password'

const mapActionCreators = {
  handleModifyPassword,
  handleLogout
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(WrappedPasswordForm))
