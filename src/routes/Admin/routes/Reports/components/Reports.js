import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './Reports.scss'

class Reports extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { children } = this.props

    return (
      <div className='page-layout__wrapper'>
        {children}
      </div>
    )
  }
}

export default Reports
