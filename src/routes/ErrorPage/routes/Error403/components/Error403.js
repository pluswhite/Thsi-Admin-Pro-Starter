import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { Button } from 'antd'

import {
  chooseRoute
} from 'vutils/Tools'

// import './Error403.scss'

class Error403 extends Component {
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
          <title>403 Forbidden</title>
        </Helmet>
        <div className='err-img err-403' />
        <div className='err-tips'>
          <h1>403</h1>
          <p>抱歉，您无权访问该内容</p>
          <Button type='primary' size='large' onClick={this.backToPage}>点击返回</Button>
        </div>
      </div>
    )
  }
}

export default Error403
