import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Menu } from 'antd'

import './Me.scss'

const PageMenuConfig = {
  '/admin/me/profile': ['profile'],
  '/admin/me/password': ['password'],
}

class Me extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      pageKeys: PageMenuConfig[props.pathname]
    }
  }

  render () {
    const { children } = this.props
    const { pageKeys } = this.state
    return (
      <div className='page-layout__wrapper'>
        <h2 className='page-title'>我的</h2>
        <Menu
          defaultSelectedKeys={pageKeys}
          selectedKeys={pageKeys}
          mode='horizontal'
          className='page-navs'
        >
          <Menu.Item key='profile'>
            <Link className='nav-item' to='/admin/me/profile' title='个人信息'>
              个人信息
            </Link>
          </Menu.Item>
          <Menu.Item key='password'>
            <Link className='nav-item' to='/admin/me/password' title='密码'>
              密码
            </Link>
          </Menu.Item>
        </Menu>
        {children}
      </div>
    )
  }
}

export default Me
