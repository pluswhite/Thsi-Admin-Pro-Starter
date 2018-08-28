import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
// import Footer from 'vcms/Footer'

import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    browserHistory.push('/login')
  }

  render () {
    return (
      <div className='page-home__container'>
        <Helmet>
          <title>首页</title>
        </Helmet>
        <div className='page-home_wrapper'>
          <div className='loaders'>
            <div className='loader'>
              <div className='loader-inner ball-scale-multiple'>
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
