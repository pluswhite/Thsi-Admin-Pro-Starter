import React, { Component } from 'react'
// import {
//   Table,
//   Icon
// } from 'antd'

import './Settings.scss'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    // this.props.fetchSettings()
  }

  render () {
    const {
      isLoading,
      userList
    } = this.props

    return (
      <div className='settings-wrapper'>
        <h2 className='page-title'>Settings</h2>
        <div className='settings-list'>
        </div>
      </div>
    )
  }
}

export default Settings
