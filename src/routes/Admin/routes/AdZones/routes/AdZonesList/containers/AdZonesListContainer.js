import { connect } from 'react-redux'
// import { injectIntl } from 'react-intl'
import {
  fetchAdZonesList,
  fetchAdZonesBindInfos,
  changeAdZonesStatus
} from '../../../modules/adZones'

import AdZonesList from '../components/AdZonesList'

const mapStateToProps = (state) => ({
  isLoading: state.adZones.isLoading,
  adZonesList: state.adZones.adZonesList
})

const mapActionCreators = {
  fetchAdZonesList,
  fetchAdZonesBindInfos,
  changeAdZonesStatus
}

export default connect(mapStateToProps, mapActionCreators)(AdZonesList)
