import { connect } from 'react-redux'

import Resources from '../components/Resources'

const mapStateToProps = (state) => ({
  pathname: state.location.pathname
})

const mapActionCreators = {
}

export default connect(mapStateToProps, mapActionCreators)(Resources)
