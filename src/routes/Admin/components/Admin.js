import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from 'vctns/HeaderContainer'

import './Admin.scss'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>后台管理</title>
        </Helmet>
        <Header />
        <h2>Admin Dashboard</h2>
      </div>
    )
  }
}

export default Admin
