import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { Button } from 'antd'

import {
  chooseRoute
} from 'vutils/Tools'

// import './Error500.scss'

class Error500 extends Component {
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
  }

  render () {
    return (
      <div className='error-content'>
        <Helmet>
          <title>500 Internal Error</title>
        </Helmet>
        <div className='err-img err-500' />
        <div className='err-tips'>
          <h1>500</h1>
          <p>抱歉，服务器出错了</p>
          <Button type='primary' size='large' onClick={this.backToPage}>点击返回</Button>
        </div>
      </div>
    )
  }
}

export default Error500
