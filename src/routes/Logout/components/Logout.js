import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './Logout.scss'

class Logout extends Component {
  static propTypes = {
    intl: PropTypes.object,
    handleLogout: PropTypes.func,
    redirect: PropTypes.func
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
        this.props.redirect()
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
    const { formatMessage } = this.props.intl

    return (
      <div className='page-layout__viewport'>
        <div className='logout-wrapper'>
          <p>
            <strong>
              {formatMessage({
                id: 'logout.tips',
                defaultMessage: 'You have been logged out.'
              })}
            </strong>
          </p>
          <p>
            {formatMessage({
              id: 'logout.redirect',
              defaultMessage: 'Redirecting to'
            })}
            <Link to='/'>
              {formatMessage({
                id: 'logout.redirect.home_page',
                defaultMessage: 'Home Page'
              })}
            </Link>
            {formatMessage({
              id: 'logout.redirect.time',
              defaultMessage: '...in'
            })}
            {this.state.timeout}s
            {formatMessage({
              id: 'logout.redirect.seconds',
              defaultMessage: 's'
            })}
          </p>
          <p>
            {formatMessage({
              id: 'logout.redirect.or',
              defaultMessage: 'or'
            })}
            <Link to='/login'>
              {formatMessage({
                id: 'logout.redirect.login',
                defaultMessage: 'login'
              })}
            </Link>
            {formatMessage({
              id: 'logout.redirect.again',
              defaultMessage: 'again.'
            })}
          </p>
        </div>
      </div>
    )
  }
}

export default Logout
