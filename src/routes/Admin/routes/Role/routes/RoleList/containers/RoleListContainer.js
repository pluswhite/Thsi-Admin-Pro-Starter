import { connect } from 'react-redux'
import {
  fetchRole,
  fetchRolePermissions
  // changeRoleStatus
} from '../../../modules/role'

import RoleList from '../components/RoleList'

const mapStateToProps = (state) => ({
  isLoading: state.role.isLoading,
  roleList: state.role.roleList
})

const mapActionCreators = {
  fetchRole,
  fetchRolePermissions
  // changeRoleStatus
}

export default connect(mapStateToProps, mapActionCreators)(RoleList)
