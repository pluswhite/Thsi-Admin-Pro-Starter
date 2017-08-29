import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <div className='page-layout__viewport'>
        <Header />
        {children}
      </div>
    )
  }
}

export default Me
