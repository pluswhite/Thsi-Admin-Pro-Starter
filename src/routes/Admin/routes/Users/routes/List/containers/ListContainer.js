import { connect } from 'react-redux'
import { fetchList } from '../modules/list'

import List from '../components/List'

const mapStateToProps = (state) => ({
  isLoading: state.list.isLoading,
  userList: state.list.userList
})

const mapActionCreators = {
  fetchList
}

export default connect(mapStateToProps, mapActionCreators)(List)
