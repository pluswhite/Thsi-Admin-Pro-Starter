import { connect } from 'react-redux'
import { fetchNewLotto } from '../modules/newLotto'

import List from '../components/NewLotto'

const mapStateToProps = (state) => ({
  isLoading: state.newLotto.isLoading,
  newLotto: state.newLotto.newLotto
})

const mapActionCreators = {
  fetchNewLotto
}

export default connect(mapStateToProps, mapActionCreators)(List)
