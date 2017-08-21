import { connect } from 'react-redux'
import Header from 'vcms/Header'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapActionCreators)(Header)
