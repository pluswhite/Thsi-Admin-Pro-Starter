import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import {
//   Table,
//   Icon
// } from 'antd'

import './Settings.scss'

class Settings extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
  }

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
    } = this.props

    return (
      <div className='page-layout__wrapper settings-wrapper'>
        <Helmet>
          <title>Settings</title>
        </Helmet>
        <h2 className='page-title'>Settings</h2>
        <div className='settings-list'>
        </div>
      </div>
    )
  }
}

export default Settings
