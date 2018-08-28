import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Zone extends Component {
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
      <div className='zone__wrapper'>
        {children}
      </div>
    )
  }
}

export default Zone
