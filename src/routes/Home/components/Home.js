import React from 'react'
import Helmet from 'react-helmet'
import Header from 'vcms/Header'

import './Home.scss'

export const Home = () => (
  <div>
    <Helmet>
      <title>首页</title>
    </Helmet>
    <Header />
    <h4>Welcome!</h4>
  </div>
)

export default Home
