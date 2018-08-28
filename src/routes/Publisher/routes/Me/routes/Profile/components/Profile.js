import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import {
  Form,
  Spin,
  Row,
  Col,
  Card,
  Button,
  Icon
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
    this.fetchProfileInfo()
  }

  fetchProfileInfo = () => {
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
      wrapperCol: {
        span: 20
      }
    }

    return (
      <div className='page-profile__wrapper'>
        <Helmet>
          <title>个人信息</title>
        </Helmet>
        <h2 className='page-title'>
          个人信息
          <small>详情</small>
        </h2>
        <div className='profile-wrapper'>
          <Card
            title={<span><Icon type='book' /> 详情</span>}
            extra={<div>
              <Button type='default' shape='circle' icon='reload' title='重新加载列表' onClick={this.fetchProfileInfo} />
              <Button type='default' shape='circle' icon='rollback' title='返回' onClick={() => browserHistory.goBack()} />
            </div>}
            bordered={false}>
            <Spin spinning={isLoading}>
              <Form layout='vertical'>
                <fieldset>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='名称'>
                        <span className='ant-form-text'>{name}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='手机'>
                        <span className='ant-form-text'>{phone}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='邮箱'>
                        <span className='ant-form-text'>{email}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='国家'>
                        <span className='ant-form-text'>{country}</span>
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend />
                  <FormItem style={{ textAlign: 'right' }}>
                    <Button onClick={() => browserHistory.goBack()}>返回</Button>
                  </FormItem>
                </fieldset>
              </Form>
            </Spin>
          </Card>
        </div>
      </div>
    )
  }
}

export default Profile
