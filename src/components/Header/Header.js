import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Layout, Menu, Row, Col, Icon } from 'antd'
import classnames from 'classnames'

import './Header.scss'

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const MsgList = [
  {
    id: '1',
    msg: 'Give me a call.',
    hasRead: false
  },
  {
    id: '2',
    msg: 'Reports attached.',
    hasRead: false
  },
  {
    id: '3',
    msg: 'Metting today.',
    hasRead: true
  }
]

const SiderMenuConfig = {
  '/admin': ['dash'],
  '/admin/dashboard': ['dash'],
  '/admin/resources': ['zone', 'resources'],
  '/admin/resources/zone': ['zone', 'resources'],
  '/admin/resources/zone/list': ['zone', 'resources'],
  '/admin/resources/zone/new': ['zone', 'resources'],
  '/admin/resources/zone/edit': ['zone', 'resources'],
  '/admin/resources/mzone': ['mzone', 'resources'],
  '/admin/resources/mzone/list': ['mzone', 'resources'],
  '/admin/resources/mzone/new': ['mzone', 'resources'],
  '/admin/resources/mzone/edit': ['mzone', 'resources'],
  '/admin/adzones': ['adzones'],
  '/admin/adzones/list': ['adzones'],
  '/admin/adzones/new': ['adzones'],
  '/admin/adzones/edit': ['adzones'],
  '/admin/reports': ['order', 'reports'],
  '/admin/reports/order': ['order', 'reports'],
  '/admin/reports/campaign': ['campaign', 'reports'],
  '/admin/reports/creative': ['creative', 'reports'],
  '/admin/account': ['account-list', 'account'],
  '/admin/account/list': ['account-list', 'account'],
  '/admin/account/new': ['account-list', 'account'],
  '/admin/account/edit': ['account-list', 'account'],
  '/admin/role': ['role-list', 'account'],
  '/admin/role/list': ['role-list', 'account'],
  '/admin/role/new': ['role-list', 'account'],
  '/admin/role/edit': ['role-list', 'account'],
  '/admin/user': ['user-list', 'user'],
  '/admin/user/list': ['user-list', 'user'],
  '/admin/user/new': ['user-list', 'user'],
  '/admin/user/edit': ['user-list', 'user'],
  '/admin/user/assets': ['user-list', 'user'],
  '/admin/user/rank': ['rank-list', 'user'],
  '/admin/user/rank/list': ['rank-list', 'user'],
  '/admin/setting': ['setting'],
  '/admin/me': ['profile', 'me'],
  '/admin/me/profile': ['profile', 'me'],
  '/admin/me/password': ['password', 'me'],
  '/admin/message': ['message-list', 'message']
}

class HeaderView extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    // siderChange: PropTypes.func,
    // siderCollapsed: PropTypes.bool,
    permissions: PropTypes.object
    // locale: PropTypes.string,
    // changeLanguage: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      siderKeys: SiderMenuConfig[props.pathname]
    }
  }

  render() {
    const {
      pathname,
      isAuthenticated,
      userName,
      // siderChange,
      // siderCollapsed,
      permissions
    } = this.props

    const { siderKeys } = this.state
    // console.log(siderKeys)
    // console.log(siderCollapsed)
    // let siderCollapsedWidth = siderVisible ? 64 : 0

    const {
      api_dashboard,
      api_admin,
      api_wx_user,
      api_products,
      api_publish,
      api_order,
      api_tag,
      api_report
      // api_set
    } = permissions

    // let isAdmin = /admin/.test(pathname)
    // console.log(isAdmin)

    let msgShowList = MsgList.map((item, index) => {
      const { id, msg, hasRead } = item
      let msgClass = classnames('btn', {
        'has-read': hasRead
      })
      return (
        <MenuItem key={index}>
          <Link className={msgClass} to={`/me/message/${id}`}>
            <p>{msg}</p>
          </Link>
        </MenuItem>
      )
    })

    // console.log(locale)
    // let localeBtn = locale.toLowerCase() === 'zh-cn'
    //   ? <a href='javascript:void(0);' style={{ minWidth: 30, textAlign: 'center' }} onClick={() => changeLanguage('en-US')} title='EN'>EN</a>
    //   : <a href='javascript:void(0);' style={{ minWidth: 30, textAlign: 'center' }} onClick={() => changeLanguage('zh-CN')} title='中文'>中文</a>

    return (
      <Header className='header'>
        <Row>
          {/* <Col xs={24} md={4} className='menu-left'>
            <Link className='btn header-logo' to='/admin/dashboard' title='AFP'>
              AFP
              <small> All for Publisher</small>
            </Link>
          </Col> */}
          {/* <Col xs={24} md={20} className='menu-content'>
            <Menu
              defaultSelectedKeys={siderKeys}
              selectedKeys={siderKeys}
              theme='light'
              // openKeys={siderKeys}
              // defaultOpenKeys={siderKeys}
              multiple
              mode='horizontal'>
              <MenuItem key='dash'>
                <Link to='/admin/dashboard' title='数据监控'>
                  <Icon type='dashboard' />
                  数据监控
                </Link>
              </MenuItem>
              <SubMenu
                key='resources'
                title={
                  <span className='menu-item'>
                    <Icon type='appstore-o' />
                    <span className='title' title='用户'>
                      媒体资源
                    </span>
                  </span>
                }>
                <MenuItem key='zone'>
                  <Link to='/admin/resources/zone' title='PC推广位'>
                    PC推广位
                  </Link>
                </MenuItem>
                <MenuItem key='mzone'>
                  <Link to='/admin/resources/mzone' title='WAP推广位'>
                    WAP推广位
                  </Link>
                </MenuItem>
              </SubMenu>
              <MenuItem key='adzones'>
                <Link to='/admin/adzones' title='推广管理'>
                  <Icon type='laptop' />
                  推广管理
                </Link>
              </MenuItem>
              <SubMenu
                key='reports'
                title={
                  <span className='menu-item'>
                    <Icon type='bar-chart' />
                    <span className='title' title='数据报告'>
                      数据报告
                    </span>
                  </span>
                }>
                <MenuItem key='order'>
                  <Link to='/admin/reports/order' title='订单报告'>
                    订单报告
                  </Link>
                </MenuItem>
                <MenuItem key='campaign'>
                  <Link to='/admin/reports/campaign' title='投放报告'>
                    投放报告
                  </Link>
                </MenuItem>
                <MenuItem key='creative'>
                  <Link to='/admin/reports/creative' title='创意报告'>
                    创意报告
                  </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu
                key='settings'
                title={
                  <span className='menu-item'>
                    <Icon type='setting' />
                    <span className='title' title='账号'>
                      系统设置
                    </span>
                  </span>
                }>
                <MenuItem key='account-list'>
                  <Link to='/admin/account' title='账号列表'>
                    账号列表
                  </Link>
                </MenuItem>
                <MenuItem key='role-list'>
                  <Link to='/admin/role' title='角色列表'>
                    角色列表
                  </Link>
                </MenuItem>
              </SubMenu>
            </Menu>
          </Col> */}
          <Col xs={24} md={24} className='menu-right'>
            <Menu defaultSelectedKeys={siderKeys} selectedKeys={siderKeys} mode='horizontal' style={{ float: 'right' }}>
              {isAuthenticated && (
                <SubMenu
                  key='message'
                  title={
                    <span>
                      <Icon type='mail' />
                      <span className='title'>消息</span>
                    </span>
                  }
                >
                  {/* {msgShowList} */}
                  <MenuItem>没有新消息~</MenuItem>
                  <MenuItem key='message-list' className='view-all-message'>
                    <Link className='btn' to='/admin/message' style={{ textAlign: 'center' }}>
                      <span className='title'>查看所有消息</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
              )}
              {isAuthenticated &&
                userName && (
                  <SubMenu
                    key='me'
                    title={
                      <span>
                        <Icon type='user' />
                        <span className='title'>{userName}</span>
                      </span>
                    }
                  >
                    <MenuItem key='profile'>
                      <Link className='btn' to='/admin/me/profile'>
                        <Icon type='solution' />
                        <span className='title'>个人信息</span>
                      </Link>
                    </MenuItem>
                    <MenuItem key='password'>
                      <Link className='btn' to='/admin/me/password'>
                        <Icon type='key' />
                        <span className='title'>密码</span>
                      </Link>
                    </MenuItem>
                    <MenuItem key='logout'>
                      <Link className='btn nav-logout' to='/login'>
                      <Icon type='poweroff' />
                        <span className='title'>退出</span>
                      </Link>
                    </MenuItem>
                  </SubMenu>
                )}
              {!isAuthenticated &&
                !/login/.test(pathname) && (
                  <MenuItem key='login'>
                    <Link className='btn' to='/login' activeClassName='active'>
                      <i className='fa fa-sign-in' />
                      <span className='title'>登录</span>
                    </Link>
                  </MenuItem>
                )}
              {/* {!isAuthenticated &&
                <MenuItem key='register'>
                  <Link className='btn' to='/register' activeClassName='active'>
                    <i className='fa fa-key' />
                    <span className='title'>注册</span>
                  </Link>
                </MenuItem>
              } */}
            </Menu>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default HeaderView
