import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Layout, Row, Col } from 'antd'
// import ReactMarkdown from 'react-markdown'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'
import HomeMd from './demo.md'

import './Home.scss'

const { Content } = Layout

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    console.log(HomeMd)
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
              <Row>
                <Col span='8' />
                <Col span='8'>
                  <h2 className='page-title'>Welcome!</h2>
                  {/* <ReactMarkdown source={HomeMd} /> */}
                </Col>
                <Col span='8' />
              </Row>
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default Home
