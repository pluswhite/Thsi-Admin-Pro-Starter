import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { handleRegister } from 'vstore/auth'

import WrappedRegistrationForm from '../components/Register'

const mapActionCreators = {
  handleRegister
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  redirectPath: state.location.query.redirect
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(WrappedRegistrationForm))
