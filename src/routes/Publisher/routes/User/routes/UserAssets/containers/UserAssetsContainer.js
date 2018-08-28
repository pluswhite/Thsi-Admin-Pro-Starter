import { connect } from 'react-redux'
import {
  updateUserAssetsInfo,
  fetchUserAssetsInfo
} from '../modules/UserAssetsModules'

import UserAssets from '../components/UserAssets'

const mapStateToProps = (state) => ({
  isLoading: state.userAssets.isLoading,
  guid: state.location.query.id,
  userAssetsInfo: state.userAssets.userAssetsInfo
})

const mapDispatchToProps = {
  updateUserAssetsInfo,
  fetchUserAssetsInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAssets)
