import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import PropTypes from 'prop-types'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

// import './Admin.scss'

const {
  Sider,
  Content
} = Layout

const { SubMenu } = Menu

const SiderMenuConfig = {
  '/admin': ['dash'],
  '/admin/dashboard': ['dash'],
  '/admin/users': ['user-list', 'users'],
  '/admin/users/list': ['user-list', 'users'],
  '/admin/reports': ['total-report', 'reports'],
  '/admin/reports/total': ['total-report', 'reports'],
  '/admin/lotto': ['lotto-list', 'lotto'],
  '/admin/lotto/list': ['lotto-list', 'lotto'],
  '/admin/lotto/new': ['lotto-list', 'lotto'],
  '/admin/settings': ['settings']
}

class Admin extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    routes: PropTypes.array,
    params: PropTypes.object,
    intl: PropTypes.object,
    handleValidateToken: PropTypes.func,
    siderCollapsed: PropTypes.bool,
    siderVisible: PropTypes.bool,
    location: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      siderKeys: SiderMenuConfig[props.location.pathname]
    }
    this.props.handleValidateToken()
  }

  itemRender = (route, params, routes, paths) => {
    const { formatMessage } = this.props.intl
    const currIndex = routes.indexOf(route)
    const last = currIndex === routes.length - 1
    const first = currIndex === 0

    if (first) {
      return <Link key={currIndex} to={'/' + paths.join('/')}><Icon type='home' /></Link>
    } else {
      return last
        ? <span key={currIndex}>{formatMessage({ id: route.path, defaultMessage: route.path })}</span>
        : <Link key={currIndex} to={'/' + paths.join('/')}>{formatMessage({ id: route.path, defaultMessage: route.path })}</Link>
    }
  }

  render () {
    const {
      children,
      intl,
      siderCollapsed,
      siderVisible,
      routes,
      params
    } = this.props

    const { formatMessage } = intl

    const {
      siderKeys
    } = this.state
    // console.log(siderKeys)
    // console.log(siderCollapsed)
    let siderCollapsedWidth = siderVisible ? 64 : 0

    return (
      <Layout className='page-layout__viewport'>
        <Header />
        <Layout className='page-layout__container'>
          <Sider
            trigger={null}
            collapsible={false}
            collapsed={siderCollapsed}
            collapsedWidth={siderCollapsedWidth}
            style={{
              background: '#fff'
            }}
          >
            <Menu
              defaultSelectedKeys={siderKeys}
              selectedKeys={siderKeys}
              defaultOpenKeys={siderKeys}
              inlineCollapsed={false}
              multiple
              mode='inline'
            >
              <Menu.Item key='dash'>
                <Link to='/admin/dashboard'>
                  <Icon type='line-chart' />
                  <span>
                    {formatMessage({
                      id: 'dashboard',
                      defaultMessage: 'Dashboard'
                    })}
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu
                key='users'
                title={<span><Icon type='team' /><span>{formatMessage({ id: 'admin.users.list', defaultMessage: 'Users' })}</span></span>}
              >
                <Menu.Item key='user-list'>
                  <Link to='/admin/users/list'>
                    {formatMessage({
                      id: 'admin.users.list',
                      defaultMessage: 'List'
                    })}
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='reports'
                title={<span><Icon type='file-text' /><span>{formatMessage({ id: 'admin.reports', defaultMessage: 'Reports' })}</span></span>}
              >
                <Menu.Item key='total-report'>
                  <Link to='/admin/reports/total'>
                    {formatMessage({
                      id: 'admin.reports.total',
                      defaultMessage: 'Total Reports'
                    })}
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='lotto'
                title={<span><Icon type='pay-circle-o' /><span>{formatMessage({ id: 'admin.lotto', defaultMessage: 'Lotto' })}</span></span>}
              >
                <Menu.Item key='lotto-list'>
                  <Link to='/admin/lotto/list'>
                    {formatMessage({
                      id: 'admin.lotto.list',
                      defaultMessage: 'List'
                    })}
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='settings'>
                <Link to='/admin/settings'>
                  <Icon type='setting' />
                  <span>
                    {formatMessage({
                      id: 'admin.settings',
                      defaultMessage: 'Settings'
                    })}
                  </span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Breadcrumb routes={routes} params={params} itemRender={this.itemRender} />
            <Content>
              {children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
