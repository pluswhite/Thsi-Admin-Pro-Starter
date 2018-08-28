import { connect } from 'react-redux'
import { handleLogout } from 'vstore/auth'
import Error500 from '../components/Error500'

const mapActionCreators = {
  handleLogout
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  redirectPath: state.location.query.redirect,
  permissions: state.auth.permissions
})

export default connect(mapStateToProps, mapActionCreators)(Error500)
