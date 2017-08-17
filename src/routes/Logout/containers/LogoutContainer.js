import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import auth from 'react-jwt-auth-redux'

import Logout from '../components/Logout'

const mapStateToProps = (state, ownPorps) => ({
  timeout: 3,
  redirect: () => {
    browserHistory.push('/')
  },
  // logout: auth.logout
})

export default connect(
  mapStateToProps
)(Logout)
