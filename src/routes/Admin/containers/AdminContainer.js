import { connect } from 'react-redux'
import { handleValidateToken } from 'vstore/auth'
import { siderChange } from '../modules/admin'

// import {
//   fetchadmin
// } from '../modules/admin'

import admin from '../components/Admin'

const mapActionCreators = {
  handleValidateToken,
  siderChange
}

const mapStateToProps = (state) => ({
  siderCollpased: state.admin.siderCollpased
})

export default connect(mapStateToProps, mapActionCreators)(admin)
