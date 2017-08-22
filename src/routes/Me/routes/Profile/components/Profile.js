import React, { Component } from 'react'
import {
  Form,
  Icon
} from 'antd'

import './Profile.scss'

const FormItem = Form.Item

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }

    return (
      <div className='profile-wrapper'>
        <h2 className='page-title'>Profile</h2>
        <div className='profile-infos'>
          <Form>
            <FormItem
              {...formItemLayout}
              label='UserName'
            >
              <span className='ant-form-text'>Zeus</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='Country'
            >
              <span className='ant-form-text'>China</span>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Profile
