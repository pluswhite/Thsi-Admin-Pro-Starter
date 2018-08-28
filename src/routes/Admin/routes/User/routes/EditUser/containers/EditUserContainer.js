import { connect } from 'react-redux'
import {
  updateUser,
  fetchUserInfo
} from '../../../modules/user'

import EditUser from '../components/EditUser'

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  guid: state.location.query.id,
  userInfo: state.user.userInfo
})

const mapDispatchToProps = {
  updateUser,
  fetchUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
