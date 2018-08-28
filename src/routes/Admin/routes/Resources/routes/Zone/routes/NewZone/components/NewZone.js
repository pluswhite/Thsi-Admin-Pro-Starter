import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import { Card, Icon, Button, Spin, message } from 'antd'

export default class NewZone extends Component {
  static propTypes = {
    // prop: PropTypes
    // activityTypeList: PropTypes.array.isRequired,
    // fetchActivityType: PropTypes.func.isRequired,
    // addActivity: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  componentWillMount = () => {
  }

  render() {
    const { isLoading } = this.state
    return (
      <div className='act-info-wrapper new'>
        <Helmet>
          <title>新增活动</title>
        </Helmet>
      </div>
    )
  }
}
