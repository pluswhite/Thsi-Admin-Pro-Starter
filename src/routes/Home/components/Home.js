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
      <div className='page-layout__viewport'>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />
        <div className='page-layout__container'>
          <div className='home-wrapper'>
            <h2 className='page-title'>Welcome!</h2>
            <p>This is an Admin Template with React, Redux, and React-Router! </p>
            <p>You can use validated email & password to login.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
