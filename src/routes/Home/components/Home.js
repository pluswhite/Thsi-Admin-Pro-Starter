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
        <div className='home-wrapper'>
          <h2>Welcome!</h2>
        </div>
      </div>
    )
  }
}

export default Home
