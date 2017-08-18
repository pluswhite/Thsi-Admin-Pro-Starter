import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from 'vctns/HeaderContainer'

import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>首页</title>
        </Helmet>
        <Header />
        <h4>Welcome!</h4>
      </div>
    )
  }
}

export default Home
