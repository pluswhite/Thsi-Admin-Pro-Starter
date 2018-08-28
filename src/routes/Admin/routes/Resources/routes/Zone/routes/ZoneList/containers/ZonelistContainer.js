import { connect } from 'react-redux'
// import { injectIntl } from 'react-intl'

import {
  // fetchActivityType
} from '../../../modules/index'

import {
  // fetchZoneList,
  // updateStatus
} from '../modules/ZoneListModule'

import ZoneList from '../components'

const mapStateToProps = (state) => ({
  // activityTypeList: state.activity.activityTypeList,
  // isLoading: state.ZoneList.isLoading,
  // fetchZoneListSuccess: state.ZoneList.fetchZoneListSuccess,
  // pagination: state.ZoneList.pagination,
  // ZoneList: state.ZoneList.ZoneList
})

const mapActionCreators = {
  // fetchActivityType,
  // fetchZoneList,
  // updateStatus
}

export default connect(mapStateToProps, mapActionCreators)(ZoneList)
