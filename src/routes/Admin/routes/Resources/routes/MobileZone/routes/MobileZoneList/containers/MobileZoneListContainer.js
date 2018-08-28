import { connect } from 'react-redux'
// import { injectIntl } from 'react-intl'

import {
  // fetchActivityType
} from '../../../modules/index'

import {
  // fetchMobileMobileZoneList,
  // updateStatus
} from '../modules/MobileZoneListModule'

import MobileZoneList from '../components'

const mapStateToProps = (state) => ({
  // activityTypeList: state.activity.activityTypeList,
  // isLoading: state.MobileMobileZoneList.isLoading,
  // fetchMobileMobileZoneListSuccess: state.MobileMobileZoneList.fetchMobileMobileZoneListSuccess,
  // pagination: state.MobileMobileZoneList.pagination,
  // MobileMobileZoneList: state.MobileMobileZoneList.MobileMobileZoneList
})

const mapActionCreators = {
  // fetchActivityType,
  // fetchMobileMobileZoneList,
  // updateStatus
}

export default connect(mapStateToProps, mapActionCreators)(MobileZoneList)
