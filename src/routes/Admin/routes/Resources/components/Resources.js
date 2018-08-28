import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Menu } from 'antd'

import './Resources.scss'

const PageMenuConfig = {
  '/admin/resources': ['zone', 'resources'],
  '/admin/resources/zone': ['zone', 'resources'],
  '/admin/resources/zone/list': ['zone', 'resources'],
  '/admin/resources/zone/new': ['zone', 'resources'],
  '/admin/resources/zone/edit': ['zone', 'resources'],
  '/admin/resources/mzone': ['mzone', 'resources'],
  '/admin/resources/mzone/list': ['mzone', 'resources'],
  '/admin/resources/mzone/new': ['mzone', 'resources'],
  '/admin/resources/mzone/edit': ['mzone', 'resources'],
}

class Resources extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    children: PropTypes.node
  }
  constructor (props) {
    super(props)
    this.state = {
      pageKeys: PageMenuConfig[props.pathname]
    }
  }

  render () {
    const {
      children
    } = this.props

    const { pageKeys } = this.state

    return (
      <div className='page-layout__wrapper product-list-wrapper'>
        <h2 className='page-title'>媒体资源</h2>
        <Menu
          defaultSelectedKeys={pageKeys}
          selectedKeys={pageKeys}
          mode='horizontal'
          className='page-navs'
        >
          <Menu.Item key='zone'>
            <Link className='nav-item' to='/admin/resources/zone' title='PC推广位'>
              PC推广位
            </Link>
          </Menu.Item>
          <Menu.Item key='mzone'>
            <Link className='nav-item' to='/admin/resources/mzone' title='WAP推广位'>
              WAP推广位
            </Link>
          </Menu.Item>
        </Menu>
        {children}
      </div>
    )
  }
}

export default Resources
