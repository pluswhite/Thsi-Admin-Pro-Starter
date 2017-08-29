import { connect } from 'react-redux'
import { fetchLottoList } from '../modules/lottoList'

import List from '../components/LottoList'

const mapStateToProps = (state) => ({
  isLoading: state.lottoList.isLoading,
  lottoList: state.lottoList.lottoList
})

const mapActionCreators = {
  fetchLottoList
}

export default connect(mapStateToProps, mapActionCreators)(List)
