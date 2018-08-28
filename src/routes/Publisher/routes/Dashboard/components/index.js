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
        <h2 className='page-title'>概览</h2>
        {/* <div className='dash-infos'>
          <Row gutter={16} className='dash-block'>
            <Block data={props[type.overview.data] || {}} />
          </Row>
          <Row className='dash-user'>
            <User target={type.user} data={props[type.user.data] || {}} handleFetch={this.handleFetch} />
          </Row>
          <Row className='dash-sales'>
            <Sales target={type.sales} data={props[type.sales.data] || {}} handleFetch={this.handleFetch} />
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12} className='dash-hotGoods'>
              <HotGoods
                target={type.hot_goods}
                data={props[type.hot_goods.data] || {}}
                handleFetch={this.handleFetch}
              />
            </Col>
            <Col xs={24} md={12} className='dash-hotCategory'>
              <HotCategory
                target={type.hot_category}
                data={props[type.hot_category.data] || {}}
                handleFetch={this.handleFetch}
              />
            </Col>
          </Row>
          <Row className='dash-salesRegion'>
            <SalesRegion
              target={type.sales_region}
              data={props[type.sales_region.data] || {}}
              handleFetch={this.handleFetch}
            />
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12} className='dash-ss'>
              <SSComponent
                target={type.hot_search}
                data={props[type.hot_search.data] || {}}
                handleFetch={this.handleFetch}
              />
            </Col>
            <Col xs={24} md={12} className='dash-ss'>
              <SSComponent
                target={type.hot_share}
                data={props[type.hot_share.data] || {}}
                handleFetch={this.handleFetch}
              />
            </Col>
          </Row>
        </div> */}
      </div>
    )
  }
}

Dashboard.propTypes = {}

export default Dashboard
