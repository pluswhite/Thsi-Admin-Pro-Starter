import { connect } from 'react-redux'
import { fetchUsers } from '../modules/users'

import Users from '../components/Users'

const mapStateToProps = (state) => ({
  isLoading: state.users.isLoading,
  userList: state.users.userList
})

const mapActionCreators = {
  fetchUsers
}

export default connect(mapStateToProps, mapActionCreators)(Users)
