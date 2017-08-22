import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from 'vctns/HeaderContainer'

import './Admin.scss'

class Admin extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleValidateToken: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {}
    this.props.handleValidateToken()
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <title>后台管理</title>
        </Helmet>
        <Header />
        <div className='admin-wrapper'>
          {children}
        </div>
      </div>
    )
  }
}

export default Admin
