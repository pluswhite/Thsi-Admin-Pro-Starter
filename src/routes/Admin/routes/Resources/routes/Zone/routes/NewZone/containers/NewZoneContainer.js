import { connect } from 'react-redux'
// import { injectIntl } from 'react-intl'
import {
  fetchActivityType,
  fetchTypeInfo,
  fetchPublishUsers,
  fetchPublishTags
} from '../../../modules/index'

import {
  addActivity
} from '../modules/NewZoneModule'

import newAct from '../components/newZone'

const mapStateToProps = (state) => ({
  // isLoading: state.newZone.isLoading
  // activityTypeList: state.activity.activityTypeList
})

const mapActionCreators = {
  fetchActivityType,
  fetchTypeInfo,
  addActivity,
  fetchPublishUsers,
  fetchPublishTags
}

export default connect(mapStateToProps, mapActionCreators)(newAct)
