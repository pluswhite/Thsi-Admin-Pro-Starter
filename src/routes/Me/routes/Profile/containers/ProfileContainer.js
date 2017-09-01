import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProfile } from '../modules/profile'

import Profile from '../components/Profile'

const mapStateToProps = (state) => ({
  isLoading: state.profile.isLoading,
  userInfo: state.profile.userInfo
})

const mapActionCreators = {
  fetchProfile
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Profile))
