import { connect } from 'react-redux'
import Header from 'vcms/Header'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName
})

export default connect(mapStateToProps, mapActionCreators)(Header)
