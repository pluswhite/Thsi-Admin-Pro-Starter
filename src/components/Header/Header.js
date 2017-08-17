import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { Layout, Menu, Icon, Row, Col } from 'antd'

import './Header.scss'

const { Header } = Layout

class HeaderView extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    // const { authenticated } = this.props
    const authenticated = false
    return (
      <Header className='header'>
        <Row>
          <Col span={6}>
            <Link className='header-logo' to='/'>VM React Admin</Link>
          </Col>
          <Col span={12}>
            <Menu
              mode='horizontal'
            >
              <Menu.Item key='home'>
                <IndexLink className='btn' to='/' activeClassName='active'>
                  <Icon type='home' /> Home
                </IndexLink>
              </Menu.Item>
              <Menu.Item key='admin'>
                {authenticated &&
                  <Link className='btn' to='/admin' activeClassName='active'>
                    <Icon type='appstore-o' /> Admin
                  </Link>
                }
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={6}>
            <Menu
              mode='horizontal'
              style={{ float: 'right' }}
            >
              {!authenticated &&
                <Menu.Item key='login'>
                  <Link className='btn' to='/login' activeClassName='active'>
                    <Icon type='key' /> Login
                  </Link>
                </Menu.Item>
              }
              {authenticated &&
                <Menu.Item key='logout'>
                  <Link className='btn nav-logout' to='/logout' activeClassName='active'>
                    <Icon type='poweroff' /> Logout
                  </Link>
                </Menu.Item>
              }
            </Menu>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default HeaderView
