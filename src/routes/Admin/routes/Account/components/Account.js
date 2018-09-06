import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Account.scss'

class Account extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      children
    } = this.props

    return (
      <div className='page-layout__wrapper'>
        <h2 className='page-title'>Account</h2>
        {children}
      </div>
    )
  }
}

export default Account
