import { connect } from 'react-redux'
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
  siderCollpased: state.settings.siderCollpased
})

export default connect(mapStateToProps, mapActionCreators)(admin)
