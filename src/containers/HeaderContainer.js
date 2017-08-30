import { connect } from 'react-redux'
import Header from 'vcms/Header'
import { siderChange } from 'vstore/settings'

const mapActionCreators = {
  siderChange
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  pathname: state.location.pathname
})

export default connect(mapStateToProps, mapActionCreators)(Header)
