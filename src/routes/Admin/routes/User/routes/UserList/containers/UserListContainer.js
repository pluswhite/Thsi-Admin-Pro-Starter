import { connect } from 'react-redux'
// import { injectIntl } from 'react-intl'
import {
  fetchUserList,
  changeUserStatus,
  changeUserType
} from '../../../modules/user'

import UserList from '../components/UserList'

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  userList: state.user.userList
})

const mapActionCreators = {
  fetchUserList,
  changeUserStatus,
  changeUserType
}

export default connect(mapStateToProps, mapActionCreators)(UserList)
