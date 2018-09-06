import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import classnames from 'classnames'
import { Layout, Menu, Breadcrumb, Spin, BackTop, Icon, Row, Col } from 'antd'
import PropTypes from 'prop-types'
// import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'
import { isObjectOwnEmpty, chooseRoute } from 'vutils/Tools'

import './Admin.scss'
import 'vcms/Header/Header.scss'

const { Header, Sider, Content } = Layout
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
  '/admin/role': ['role-list', 'role'],
  '/admin/role/list': ['role-list', 'role'],
  '/admin/role/new': ['role-list', 'role'],
  '/admin/role/edit': ['role-list', 'role'],
  '/admin/user': ['user-list', 'user'],
  '/admin/user/list': ['user-list', 'user'],
  '/admin/user/new': ['user-list', 'user'],
  '/admin/user/edit': ['user-list', 'user'],
  '/admin/user/assets': ['user-list', 'user'],
  '/admin/user/rank': ['rank-list', 'user'],
  '/admin/user/rank/list': ['rank-list', 'user'],
  '/admin/settings': ['settings'],
  '/admin/me': ['profile', 'me'],
  '/admin/me/profile': ['profile', 'me'],
  '/admin/me/password': ['password', 'me'],
  '/admin/message': ['message-list', 'message']
}

class Admin extends Component {
  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array,
    params: PropTypes.object,
    intl: PropTypes.object,
    isLoading: PropTypes.bool,
    handleValidateToken: PropTypes.func,
    handleLogout: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    permissions: PropTypes.object,
    // siderCollapsed: PropTypes.bool,
    // siderVisible: PropTypes.bool,
    location: PropTypes.object,
    pathname: PropTypes.string,
    userName: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      siderKeys: SiderMenuConfig[props.pathname]
    }
  }

  componentDidMount = () => {
    const { isAuthenticated, permissions, location } = this.props
    // console.log(location)
    if (isAuthenticated) {
      // console.log(isObjectOwnEmpty(permissions))
      if (isObjectOwnEmpty(permissions)) {
        // console.log(location.pathname)
        this.props.handleValidateToken(() => {
          browserHistory.push(location.pathname || '/admin/dashboard')
        })
      } else {
        // console.log(location.pathname)
        let redirectPath = chooseRoute(permissions)

        // console.log(redirectPath)

        if (redirectPath === '') {
          this.props.handleLogout(() => {
            browserHistory.push('/login')
          })
        }
      }
    }
  }

  itemRender = (route, params, routes, paths) => {
    const { formatMessage } = this.props.intl
    const currIndex = routes.indexOf(route)
    const last = currIndex === routes.length - 1
    const first = currIndex === 0

    if (first) {
      return (
        <Link key={currIndex} to={'/admin/dashboard'}>
          <Icon type='home' />
        </Link>
      )
    } else {
      return last ? (
        route.path === '(:guid)' ? (
          <span key={currIndex}>{params.guid}</span>
        ) : (
          <span key={currIndex}>{formatMessage({ id: route.path, defaultMessage: route.path })}</span>
        )
      ) : (
        <Link key={currIndex} to={'/' + paths.join('/')}>
          {formatMessage({ id: route.path, defaultMessage: route.path })}
        </Link>
      )
    }
  }

  render () {
    const {
      children,
      // siderVisible,
      routes,
      params,
      pathname,
      isAuthenticated,
      userName,
      isLoading,
      intl
    } = this.props

    const { formatMessage } = intl

    // console.log(permissions)
    // console.log(siderKeys)
    // console.log(siderCollapsed)
    // let siderCollapsedWidth = siderVisible ? 64 : 0
    const { siderKeys } = this.state

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

    return (
      <Layout className='page-layout__viewport'>
        <Spin size='large' tip='数据加载中...' spinning={isLoading} wrapperClassName='page-loading'>
          <Sider className='sider' width='110' style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Link className='btn header-logo' to='/admin/dashboard' title='AFP'>
              LOGO
            </Link>
            <Menu defaultSelectedKeys={siderKeys} selectedKeys={siderKeys} mode='inline'>
              <MenuItem key='dash'>
                <Link className='nav-item' to='/admin/dashboard' title='Dashboard'>
                  <div className='nav-icon'>
                    <Icon type='dashboard' />
                  </div>
                  <p className='nav-text'>Dashboard</p>
                </Link>
              </MenuItem>
              <MenuItem key='resources'>
                <Link className='nav-item' to='/admin/resources/zone' title='Resources'>
                  <div className='nav-icon'>
                    <Icon type='appstore-o' />
                  </div>
                  <p className='nav-text'>Resources</p>
                </Link>
              </MenuItem>
              <MenuItem key='adzones'>
                <Link className='nav-item' to='/admin/adzones' title='Adzones'>
                  <div className='nav-icon'>
                    <Icon type='laptop' />
                  </div>
                  <p className='nav-text'>Adzones</p>
                </Link>
              </MenuItem>
              <MenuItem key='reports'>
                <Link className='nav-item' to='/admin/reports' title='Reports'>
                  <div className='nav-icon'>
                    <Icon type='bar-chart' />
                  </div>
                  <p className='nav-text'>Reports</p>
                </Link>
              </MenuItem>
              <MenuItem key='account'>
                <Link className='nav-item' to='/admin/account' title='Accounts'>
                  <div className='nav-icon'>
                    <Icon type='team' />
                  </div>
                  <p className='nav-text'>Accounts</p>
                </Link>
              </MenuItem>
              <MenuItem key='role'>
                <Link className='nav-item' to='/admin/role' title='Roles'>
                  <div className='nav-icon'>
                    <Icon type='key' />
                  </div>
                  <p className='nav-text'>Roles</p>
                </Link>
              </MenuItem>
              <MenuItem key='settings'>
                <Link className='nav-item' to='/admin/settings' title='Settings'>
                  <div className='nav-icon'>
                    <Icon type='setting' />
                  </div>
                  <p className='nav-text'>Settings</p>
                </Link>
              </MenuItem>
            </Menu>
          </Sider>
          <Layout className='page-layout__container' style={{ marginLeft: 110 }}>
            <Header className='header'>
              <Row>
                <Col xs={24} md={20} className='menu-content'>
                  <Breadcrumb className='breadcrumb' routes={routes} params={params} itemRender={this.itemRender} />
                </Col>
                <Col xs={24} md={4} className='menu-right'>
                  <Menu defaultSelectedKeys={siderKeys} selectedKeys={siderKeys} mode='horizontal' style={{ float: 'right' }}>
                    {isAuthenticated && (
                      <SubMenu
                        key='message'
                        title={
                          <span>
                            <Icon type='mail' />
                            <span className='title'>{formatMessage({ id: 'message.title', defaultMessage: 'message' })}</span>
                          </span>
                        }
                      >
                        {msgShowList}
                        {msgShowList.length === 0 &&
                          <MenuItem>{formatMessage({ id: 'message.empty', defaultMessage: 'Empty' })}</MenuItem>
                        }
                        <MenuItem key='message-list' className='view-all-message'>
                          <Link className='btn' to='/admin/message' style={{ textAlign: 'center' }}>
                            <span className='title'>{formatMessage({ id: 'message.all', defaultMessage: 'View all messages' })}</span>
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
                              <span className='title'>{formatMessage({ id: 'profile', defaultMessage: 'Profile' })}</span>
                            </Link>
                          </MenuItem>
                          <MenuItem key='password'>
                            <Link className='btn' to='/admin/me/password'>
                              <Icon type='key' />
                              <span className='title'>{formatMessage({ id: 'password', defaultMessage: 'Password' })}</span>
                            </Link>
                          </MenuItem>
                          <MenuItem key='logout'>
                            <Link className='btn nav-logout' to='/login'>
                            <Icon type='poweroff' />
                              <span className='title'>{formatMessage({ id: 'logout', defaultMessage: 'Logout' })}</span>
                            </Link>
                          </MenuItem>
                        </SubMenu>
                      )}
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Content>{children}</Content>
            <Footer />
            <BackTop />
          </Layout>
        </Spin>
      </Layout>
    )
  }
}

export default Admin
