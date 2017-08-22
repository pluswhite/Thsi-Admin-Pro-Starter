import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link } from 'react-router'
import { Layout, Menu, Icon, Row, Col } from 'antd'

import './Header.scss'

const { Header } = Layout

class HeaderView extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userName: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      isAuthenticated,
      userName
    } = this.props
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
                {isAuthenticated &&
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
              {isAuthenticated && userName &&
                <Menu.Item key='me'>
                  <Link className='btn' to='/me' activeClassName='active'>
                    {userName}
                  </Link>
                </Menu.Item>
              }
              {!isAuthenticated &&
                <Menu.Item key='login'>
                  <Link className='btn' to='/login' activeClassName='active'>
                    <Icon type='key' /> Login
                  </Link>
                </Menu.Item>
              }
              {isAuthenticated &&
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
