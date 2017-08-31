import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Header from 'vcms/Header'
import { siderChange, changeLanguage } from 'vstore/settings'

const mapActionCreators = {
  siderChange,
  changeLanguage
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  pathname: state.location.pathname,
  locale: state.settings.locale
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Header))
