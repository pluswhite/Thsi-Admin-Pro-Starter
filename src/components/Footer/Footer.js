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
      <Footer style={{
        textAlign: 'center'
      }}>
        VM React Admin ©{thisYear} Created by PlusWhite
      </Footer>
    )
  }
}

export default FooterView
