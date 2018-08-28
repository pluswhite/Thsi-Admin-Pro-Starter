import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'

import './Logout.scss'

class Logout extends Component {
  static propTypes = {
    // intl: PropTypes.object,
    handleLogout: PropTypes.func,
  }
  constructor (props) {
    super(props)

    this.timer = null
    this.state = {
      timeout: 3,
    }
  }

  componentDidMount () {
    this.props.handleLogout()
    this.timer = setInterval(() => {
      let timeout = this.state.timeout - 1
      if (timeout <= 0) {
        this.clearTimer()
        browserHistory.push('/login')
        return
      }
      this.setState({
        timeout: timeout
      })
    }, 1000)
  }

  componentWillUnmount () {
    if (this.timer != null) {
      this.clearTimer()
    }
  }

  clearTimer () {
    clearInterval(this.timer)
    this.timer = null
  }

  render () {
    return (
      <div className='page-layout__viewport page-logout__wrapper'>
        <div className='logout-wrapper'>
          <p>
            <strong>成功退出！</strong>
          </p>
          <p>
            页面将在{this.state.timeout}秒之后跳转到 <Link to='/login'>登录</Link>
          </p>
          {/* <p>或者点击重新 <Link to='/login'>登录</Link></p> */}
        </div>
      </div>
    )
  }
}

export default Logout
