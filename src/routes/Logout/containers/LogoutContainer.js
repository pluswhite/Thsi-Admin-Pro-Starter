import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { browserHistory } from 'react-router'
import { handleLogout } from 'vstore/auth'

import Logout from '../components/Logout'

const mapStateToProps = (state, ownPorps) => ({
  redirect: () => {
    browserHistory.push('/')
  },
  // logout: auth.logout
})

const mapActionCreators = {
  handleLogout
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(Logout))
