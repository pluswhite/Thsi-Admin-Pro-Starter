import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import { Row, Col } from 'antd'
// import Block from './charts/Block'
// import User from './charts/User'
// import Sales from './charts/Sales'
// import SalesRegion from './charts/SalesRegion'
// import HotGoods from './charts/HotGoods'
// import HotCategory from './charts/HotCategory'
// import SSComponent from './charts/SSComponent'
import { type } from './config'
import './index.scss'
class Dashboard extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired
  }
  componentWillMount () {
    // 默认获取block数据
    // this.handleFetch(type.overview)
  }

  componentDidMount = () => {
    // this._fetchOverViewInterval = setInterval(() => {
    //   this.handleFetch(type.overview)
    // }, 5000)
  }

  componentWillUnmount = () => {
    // clearInterval(this._fetchOverViewInterval)
  }

  handleFetch = (target, params, successCallback, failCallback) => {
    const { fetchData } = this.props
    fetchData(
      target,
      params,
      successData => {
        successCallback && successCallback(successData)
      },
      fail => {
        failCallback && failCallback()
      }
    )
  }

  render () {
    const { props } = this
    return (
      <div className='page-layout__wrapper dash-wrapper'>
        <Helmet>
          <title>概览</title>
        </Helmet>
        <h2 className='page-title'>数据监控</h2>
      </div>
    )
  }
}

Dashboard.propTypes = {}

export default Dashboard
