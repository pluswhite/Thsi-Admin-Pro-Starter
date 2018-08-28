import { connect } from 'react-redux'
import {
  updateRoleInfo,
  fetchRoleItem,
  resetRoleInfo
} from '../../../modules/role'

import EditRole from '../components/EditRole'

const mapStateToProps = (state) => ({
  isLoading: state.role.isLoading,
  guid: state.location.query.id,
  roleInfo: state.role.roleInfo
})

const mapDispatchToProps = {
  updateRoleInfo,
  fetchRoleItem,
  resetRoleInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRole)
