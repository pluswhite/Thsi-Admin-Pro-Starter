import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './ErrorPage.scss'

class ErrorPage extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const {
      children
    } = this.props

    return (
      <div className='error-wrap'>
        <Helmet>
          <title>Unkonw Error</title>
        </Helmet>
        {children}
      </div>
    )
  }
}

export default ErrorPage
