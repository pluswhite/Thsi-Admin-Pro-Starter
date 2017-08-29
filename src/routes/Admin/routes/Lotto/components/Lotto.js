import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Lotto.scss'

class Lotto extends Component {
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
        {children}
      </div>
    )
  }
}

export default Lotto
