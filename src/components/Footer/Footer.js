import React, { Component } from 'react'
import { Layout } from 'antd'
import moment from 'moment'

import './Footer.scss'

const { Footer } = Layout

class FooterView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thisYear: moment().format('YYYY')
    }
  }

  render () {
    const { thisYear } = this.state

    return (
      <Footer className='footer'>
        Copyright © 2017-{thisYear} LOGO All Rights Reserved.
      </Footer>
    )
  }
}

export default FooterView
