import { connect } from 'react-redux'
import {
  updateRoleInfo,
  fetchRoleItem
} from '../../../modules/role'

import NewRole from '../components/NewRole'

const mapStateToProps = (state) => ({
  isLoading: state.role.isLoading,
  roleInfo: state.role.roleInfo
})

const mapDispatchToProps = {
  updateRoleInfo,
  fetchRoleItem
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRole)
