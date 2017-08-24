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

class Admin extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleValidateToken: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
    this.props.handleValidateToken()
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    })
  }

  render () {
    const { children } = this.props
    const { collapsed } = this.state

    return (
      <Layout>
        <Helmet>
          <title>后台管理</title>
        </Helmet>
        <Header />
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            style={{
              background: '#fff'
            }}
          >
            <Menu defaultSelectedKeys={['1']} mode='inline'>
              <Menu.Item key='1'>
                <Link to='/admin'>
                  <Icon type='line-chart' />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key='sub1'
                title={<span><Icon type='team' /><span>User</span></span>}
              >
                <Menu.Item key='3'>
                  <Link to='/admin/users'>List</Link>
                </Menu.Item>
              </SubMenu>
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
