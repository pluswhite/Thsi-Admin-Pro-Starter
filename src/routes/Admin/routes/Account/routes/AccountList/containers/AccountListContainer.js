import { connect } from 'react-redux'
import {
  fetchAccount,
  changeAccountStatus,
  resetAccountPassword
} from '../../../modules/account'

import AccountList from '../components/AccountList'

const mapStateToProps = (state) => ({
  isLoading: state.accounts.isLoading,
  accountList: state.accounts.accountList
})

const mapActionCreators = {
  fetchAccount,
  changeAccountStatus,
  resetAccountPassword
}

export default connect(mapStateToProps, mapActionCreators)(AccountList)
