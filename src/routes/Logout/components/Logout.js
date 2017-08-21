import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './Logout.scss'

class Logout extends Component {
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
    return (
      <div className='core-layout__viewport'>
        <div style={{ textAlign: 'center' }}>
          <p>
            <strong>You have been logged out.</strong>
          </p>
          <p>
            Redirecting to <Link to='/'>home page</Link>
            ...in {this.state.timeout}s
          </p>
          <p>
            or <Link to='/login'>login</Link> again.
          </p>
        </div>
      </div>
    )
  }
}

export default Logout
