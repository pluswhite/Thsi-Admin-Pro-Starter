import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link } from 'react-router'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import classnames from 'classnames'

import './Header.scss'

const { Header } = Layout
const SubMenu = Menu.SubMenu

const MsgList = [
  {
    'id': '1',
    'msg': 'Give me a call.',
    'hasRead': false
  },
  {
    'id': '2',
    'msg': 'Reports attached.',
    'hasRead': false
  },
  {
    'id': '3',
    'msg': 'Metting today.',
    'hasRead': true
  }
]

class HeaderView extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    siderChange: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      isAuthenticated,
      userName,
      siderChange
    } = this.props

    let msgShowList = MsgList.map((item, index) => {
      const { id, msg, hasRead } = item
      let msgClass = classnames(
        'btn',
        {
          'has-read': hasRead
        }
      )
      return (
        <Menu.Item key={index}>
          <Link className={msgClass} to={`/me/message/${id}`}>
            <p>{msg}</p>
          </Link>
        </Menu.Item>
      )
    })

    return (
      <Header className='header'>
        <Row>
          <Col span={6}>
            <Link className='header-logo' to='/'>VM React Admin</Link>
            <div className='menu-trigger' onClick={siderChange}>
              <i className='fa fa-bars' />
            </div>
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
              {isAuthenticated &&
                <Menu.Item key='admin-dashbaord'>
                  <Link className='btn' to='/admin/dashboard' activeClassName='active'>
                    <Icon type='appstore-o' /> Admin
                  </Link>
                </Menu.Item>
              }
            </Menu>
          </Col>
          <Col span={6}>
            <Menu
              mode='horizontal'
              style={{ float: 'right' }}
            >
              {isAuthenticated &&
                <SubMenu title={<span><Icon type='mail' />Messages</span>}>
                  {msgShowList}
                  <Menu.Item key='all-message' className='view-all-message'>
                    <Link className='btn' to='/me/message'>
                      View all messages
                    </Link>
                  </Menu.Item>
                </SubMenu>
              }
              {isAuthenticated && userName &&
                <SubMenu title={<span><Icon type='user' />{userName}</span>}>
                  <Menu.Item key='me-profile'>
                    <Link className='btn' to='/me' activeClassName='active'>
                      <Icon type='idcard' /> Profiles
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='me-password'>
                    <Link className='btn' to='/me/password' activeClassName='active'>
                      <Icon type='key' /> Password
                    </Link>
                  </Menu.Item>
                </SubMenu>
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
