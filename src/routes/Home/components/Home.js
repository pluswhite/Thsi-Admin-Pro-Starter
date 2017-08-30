import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Layout } from 'antd'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

import './Home.scss'

const { Content } = Layout

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Layout className='layout'>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />
        <Content>
          <div className='page-layout__viewport'>
            <div className='home-wrapper'>
              <h2 className='page-title'>Welcome!</h2>
              <p>This is an Admin Template with React, Redux, and React-Router! </p>
              <p>You can use validated email & password to login.</p>
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default Home
