import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Header from 'vctns/HeaderContainer'

import './Me.scss'

class Me extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <title>Me</title>
        </Helmet>
        <Header />
        <div className='me-wrapper'>
          {children}
        </div>
      </div>
    )
  }
}

export default Me
