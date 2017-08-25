import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import './Counter.scss'

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.object.isRequired,
    // fetchCounter: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      counter
    } = this.props

    return (
      <div className='page-layout__viewport'>
        <Helmet>
          <title>Counter</title>
        </Helmet>
        {counter}
      </div>
    )
  }
}

export default Counter
