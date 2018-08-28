import { connect } from 'react-redux'
// import { injectIntl } from 'react-intl'
import { handleLogout } from 'vstore/auth'

import Logout from '../components/Logout'

const mapStateToProps = (state, ownPorps) => ({
  // logout: auth.logout
})

const mapActionCreators = {
  handleLogout
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(Logout)
