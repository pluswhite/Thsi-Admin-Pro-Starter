import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Card, Row, Col, Button, Icon, Pagination, Spin } from 'antd'

// import './list.scss'

/**
 * 页面主组件
 */
class ActList extends Component {
  static propTypes = {
  //   fetchActivityType: PropTypes.func.isRequired,
  //   activityTypeList: PropTypes.array.isRequired,
  //   isLoading: PropTypes.bool.isRequired,
  //   fetchMobileMobileZonelistSuccess: PropTypes.bool.isRequired,
  //   MobileMobileZonelist: PropTypes.array.isRequired,
  //   fetchMobileMobileZonelist: PropTypes.func.isRequired,
  //   pagination: PropTypes.object.isRequired,
  //   // updateProduct: PropTypes.func.isRequired,
  //   // addProduct: PropTypes.func.isRequired,
  //   updateStatus: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      // pagination: {
      //   current: 1,
      //   pageSize: 30,
      //   total: 0
      // },
      // itemWidth: 250
    }
  }

  componentWillMount = () => {
    // this.props.fetchActivityType()
  }

  componentDidMount = () => {
    // this.fetchData()
    // this.toFetchData()
  }

  onReloadList = () => {
    this.toFetchData()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.toFetchData()
  }

  handleReset = () => {
    this._filter.props.form.resetFields()
  }

  render() {
    const {
      // activityTypeList,
      // isLoading,
      // pagination,
      // MobileMobileZonelist,
      // updateStatus,
      // fetchMobileMobileZonelistSuccess
    } = this.props
    // const { itemWidth } = this.state
    return (
      <div className='act-list-wrapper'>
        <Helmet>
          <title>活动列表</title>
        </Helmet>
        <div className='zone-list'>WAP推广位列表</div>
      </div>
    )
  }
}

export default ActList
