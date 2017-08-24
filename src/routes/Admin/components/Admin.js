import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from 'vctns/HeaderContainer'

import './Admin.scss'

const {
  Footer,
  Sider,
  Content
} = Layout

const { SubMenu } = Menu

const SiderMenuConfig = {
  '/admin': ['dash'],
  '/admin/users': ['user-list', 'users'],
  '/admin/reports': ['total-report', 'reports'],
  '/admin/settings': ['settings']
}

class Admin extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleValidateToken: PropTypes.func,
    siderCollpased: PropTypes.bool,
    location: PropTypes.object,
    siderChange: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      siderKeys: SiderMenuConfig[props.location.pathname]
    }
    this.props.handleValidateToken()
  }

  onCollapse = (collapsed) => {
    // console.log(collapsed)
    this.props.siderChange(collapsed)
  }

  render () {
    const {
      children,
      siderCollpased
    } = this.props

    const {
      siderKeys
    } = this.state
    // console.log(siderKeys)
    // console.log(siderCollpased)

    return (
      <Layout>
        <Helmet>
          <title>后台管理</title>
        </Helmet>
        <Header />
        <Layout>
          <Sider
            collapsible
            collapsed={siderCollpased}
            onCollapse={this.onCollapse}
            style={{
              background: '#fff'
            }}
          >
            <Menu
              defaultSelectedKeys={siderKeys}
              selectedKeys={siderKeys}
              defaultOpenKeys={siderKeys}
              inlineCollapsed={false}
              mode='inline'
            >
              <Menu.Item key='dash'>
                <Link to='/admin'>
                  <Icon type='line-chart' />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key='users'
                title={<span><Icon type='team' /><span>Users</span></span>}
              >
                <Menu.Item key='user-list'>
                  <Link to='/admin/users'>List</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='reports'
                title={<span><Icon type='file-text' /><span>Reports</span></span>}
              >
                <Menu.Item key='total-report'>
                  <Link to='/admin/reports'>Total Reports</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='settings'>
                <Link to='/admin/settings'>
                  <Icon type='setting' />
                  <span>Settings</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <div className='admin-wrapper'>
                {children}
              </div>
            </Content>
            <Footer style={{
              textAlign: 'center'
            }}>
              VM React Admin ©2017 Created by PlusWhite
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
