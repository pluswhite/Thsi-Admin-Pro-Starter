import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MobileZone extends Component {
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
      <div className='mzone__wrapper'>
        {children}
      </div>
    )
  }
}

export default MobileZone
