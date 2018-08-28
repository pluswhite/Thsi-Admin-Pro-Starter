import { connect } from 'react-redux'
import {
  updateAccountInfo,
  fetchAccountItem,
  fetchAccountEmailUnique
} from '../../../modules/account'

import NewAccount from '../components/NewAccount'

const mapStateToProps = (state) => ({
  isLoading: state.accounts.isLoading,
  emailChecking: state.accounts.emailChecking,
  accountInfo: state.accounts.accountInfo
})

const mapDispatchToProps = {
  updateAccountInfo,
  fetchAccountItem,
  fetchAccountEmailUnique
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAccount)
