import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import {
  Button
} from 'antd'
import {
  chooseRoute
} from 'vutils/Tools'

import './NoContent.scss'

class NoContent extends Component {
  static propTypes = {
    permissions: PropTypes.object,
    handleLogout: PropTypes.func
  }

  backToPage = (evt) => {
    const {
      permissions
    } = this.props

    let redirectPath = chooseRoute(permissions)

    if (redirectPath === '') {
      this.props.handleLogout(() => {
        browserHistory.push('/login')
      })
    } else {
      browserHistory.push(redirectPath)
    }

    browserHistory.push(redirectPath)
  }

  render () {
    return (
      <div className='error-wrap'>
        <Helmet>
          <title>404 Not Found</title>
        </Helmet>
        <div className='error-content'>
          <div className='err-img' />
          <div className='err-tips'>
            <h1>404 </h1>
            <p>抱歉，您访问的内容不存在</p>
            <Button type='primary' size='large' onClick={() => browserHistory.goBack()}>点击返回</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default NoContent
