import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Icon } from 'antd'
import { Link } from 'react-router'

import './NoContent.scss'

class NoContent extends Component {
  render () {
    return (
      <div className='error-wrap'>
        <Helmet>
          <title>404 Not Found</title>
        </Helmet>
        <div className='error-content'>
          <h1>
            <Icon type='frown' /> 404
          </h1>
          <p>Ops! Not Found.</p>
        </div>
        <p className='tips'>Click to go <Link to='/'>Home</Link></p>
      </div>
    )
  }
}

export default NoContent
