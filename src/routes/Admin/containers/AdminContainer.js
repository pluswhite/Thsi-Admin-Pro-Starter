import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { handleValidateToken } from 'vstore/auth'
import { siderChange } from 'vstore/settings'

// import {
//   fetchadmin
// } from '../modules/admin'

import admin from '../components/Admin'

const mapActionCreators = {
  handleValidateToken,
  siderChange
}

const mapStateToProps = (state) => ({
  siderCollapsed: state.settings.siderCollapsed,
  siderVisible: state.settings.siderVisible
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(admin))
