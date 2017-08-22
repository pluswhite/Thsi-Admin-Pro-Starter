import { connect } from 'react-redux'
import { handleValidateToken } from 'vstore/auth'

// import {
//   fetchadmin
// } from '../modules/admin'

import admin from '../components/Admin'

const mapActionCreators = {
  handleValidateToken
  // fetchadmin
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapActionCreators)(admin)
