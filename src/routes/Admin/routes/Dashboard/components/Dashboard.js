import React, { Component } from 'react'

import './Dashboard.scss'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='dash-wrapper'>
        <h2 className='page-title'>Dashboard</h2>
      </div>
    )
  }
}

export default Dashboard
