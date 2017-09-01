import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  Form,
  Spin,
  Row,
  Col
} from 'antd'

import './Profile.scss'

const FormItem = Form.Item

class Profile extends Component {
  static propTypes = {
    intl: PropTypes.object,
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
      intl,
      isLoading,
      userInfo
    } = this.props

    const {
      formatMessage
    } = intl

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
      <div className='page-layout__viewport'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'profile',
              defaultMessage: 'Profile'
            })}
          </title>
        </Helmet>
        <Row>
          <Col xs={0} md={8} />
          <Col md={8}>
            <h2 className='page-title'>
              {formatMessage({
                id: 'profile',
                defaultMessage: 'Profile'
              })}
            </h2>
            <div className='profile-wrapper'>
              <div className='profile-infos'>
                <Spin spinning={isLoading}>
                  <Form>
                    <FormItem
                      {...formItemLayout}
                      label={formatMessage({
                        id: 'profile.name',
                        defaultMessage: 'Name'
                      })}
                    >
                      <span className='ant-form-text'>{name}</span>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={formatMessage({
                        id: 'profile.phone',
                        defaultMessage: 'Phone'
                      })}
                    >
                      <span className='ant-form-text'>{phone}</span>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={formatMessage({
                        id: 'profile.email',
                        defaultMessage: 'Email'
                      })}
                    >
                      <span className='ant-form-text'>{email}</span>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={formatMessage({
                        id: 'profile.country',
                        defaultMessage: 'Country'
                      })}
                    >
                      <span className='ant-form-text'>{country}</span>
                    </FormItem>
                  </Form>
                </Spin>
              </div>
            </div>
          </Col>
          <Col xs={0} md={8} />
        </Row>
      </div>
    )
  }
}

export default Profile
