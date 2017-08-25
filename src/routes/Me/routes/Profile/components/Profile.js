import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  Form,
  Spin
} from 'antd'

import './Profile.scss'

const FormItem = Form.Item

class Profile extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    userInfo: PropTypes.object,
    fetchProfile: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.props.fetchProfile()
  }

  render () {
    const {
      isLoading,
      userInfo
    } = this.props

    const {
      name,
      phone,
      email,
      country
    } = userInfo

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }

    return (
      <div className='page-layout__container'>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <h2 className='page-title'>Profile</h2>
        <div className='profile-wrapper'>
          <div className='profile-infos'>
            <Spin spinning={isLoading}>
              <Form>
                <FormItem
                  {...formItemLayout}
                  label='Name'
                >
                  <span className='ant-form-text'>{name}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Phone'
                >
                  <span className='ant-form-text'>{phone}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Email'
                >
                  <span className='ant-form-text'>{email}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Country'
                >
                  <span className='ant-form-text'>{country}</span>
                </FormItem>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
