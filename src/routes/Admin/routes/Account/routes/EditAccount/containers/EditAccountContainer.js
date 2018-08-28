import { connect } from 'react-redux'
import {
  updateAccountInfo,
  fetchAccountItem
} from '../../../modules/account'

import EditAccount from '../components/EditAccount'

const mapStateToProps = (state) => ({
  isLoading: state.accounts.isLoading,
  guid: state.location.query.id,
  accountInfo: state.accounts.accountInfo,
  // roleList: state.accounts.accountInfo.roleList,
  // accountItem: state.accounts.accountInfo.accountItem
})

const mapDispatchToProps = {
  updateAccountInfo,
  fetchAccountItem
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)
