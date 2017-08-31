import { connect } from 'react-redux'
import App from 'vcms/App'
// import { siderChange, changeLanguage } from 'vstore/settings'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  locale: state.settings.locale
})

export default connect(mapStateToProps, mapActionCreators)(App)
