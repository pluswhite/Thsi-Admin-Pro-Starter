import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Layout, Breadcrumb, Spin, BackTop } from 'antd'
import PropTypes from 'prop-types'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'
import { isObjectOwnEmpty, chooseRoute } from 'vutils/Tools'

import './Publisher.scss'

const { Content } = Layout

class Publisher extends Component {
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
    location: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {}
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
        <Link key={currIndex} to={'/' + paths.join('/')}>
          <i className='fa fa-home' />
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
      isLoading
    } = this.props

    // console.log(permissions)
    // console.log(siderKeys)
    // console.log(siderCollapsed)
    // let siderCollapsedWidth = siderVisible ? 64 : 0

    return (
      <Layout className='page-layout__viewport'>
        <Spin size='large' tip='数据加载中...' spinning={isLoading} wrapperClassName='page-loading'>
          <Layout className='page-layout__container'>
            <Header />
            <Breadcrumb className='breadcrumb' routes={routes} params={params} itemRender={this.itemRender} />
            <Content>{children}</Content>
            <Footer />
            <BackTop />
          </Layout>
        </Spin>
      </Layout>
    )
  }
}

export default Publisher
