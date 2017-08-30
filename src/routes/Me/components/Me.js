import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

import './Me.scss'

const { Content } = Layout

class Me extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { children } = this.props
    return (
      <Layout className='layout'>
        <Header />
        <Content>
          {children}
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default Me
