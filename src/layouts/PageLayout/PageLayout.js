import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

class PageLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { children } = this.props
    return (
      <div className='container'>
        {children}
      </div>
    )
  }
}

export default PageLayout
