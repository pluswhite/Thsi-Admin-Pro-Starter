import React, { Component } from 'react'
import { Icon } from 'antd'

import './NoContent.scss'

class NoContent extends Component {
  render () {
    return (
      <div className='error-wrap'>
        <h1>
          <Icon type='frown' /> 404
        </h1>
        <p>Not Found.</p>
      </div>
    )
  }
}

export default NoContent
