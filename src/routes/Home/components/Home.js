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
      <div className='home-wrapper'>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />
        <div>
          <h2 className='page-title'>Welcome!</h2>
        </div>
      </div>
    )
  }
}

export default Home
