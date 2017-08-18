import { connect } from 'react-redux'
import Header from 'vcms/Header'

const mapActionCreators = {
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!(state.auth && state.auth.isAuthenticated)
  }
}

export default connect(mapStateToProps, mapActionCreators)(Header)
