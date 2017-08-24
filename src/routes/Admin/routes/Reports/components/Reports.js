import React, { Component } from 'react'
// import {
//   Table,
//   Icon
// } from 'antd'

import './Reports.scss'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    // this.props.fetchReports()
  }

  render () {
    const {
      isLoading,
      userList
    } = this.props

    return (
      <div className='reports-wrapper'>
        <h2 className='page-title'>Reports</h2>
        <div className='reports-list'>
        </div>
      </div>
    )
  }
}

export default Reports
