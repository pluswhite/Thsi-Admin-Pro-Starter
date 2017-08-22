import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from 'vctns/HeaderContainer'

import { Button } from 'antd'

import './Admin.scss'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { handleValidateToken } = this.props
    return (
      <div>
        <Helmet>
          <title>后台管理</title>
        </Helmet>
        <Header />
        <div>
          <h2>Admin Dashboard</h2>
          <Button type='primary' onClick={handleValidateToken}>Validate Token</Button>
        </div>
      </div>
    )
  }
}

export default Admin
