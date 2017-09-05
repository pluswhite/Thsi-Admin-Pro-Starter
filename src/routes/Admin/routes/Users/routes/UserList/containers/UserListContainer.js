import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchList } from '../modules/userList'

import UserList from '../components/UserList'

const mapStateToProps = (state) => ({
  isLoading: state.userList.isLoading,
  userList: state.userList.userList
})

const mapActionCreators = {
  fetchList
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(UserList))
