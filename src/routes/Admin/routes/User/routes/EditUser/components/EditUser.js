import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { browserHistory } from 'react-router'
import store from 'store'
import {
  Row,
  Col,
  Card,
  Icon,
  Form,
  Input,
  Button,
  Select,
  Spin,
  message
} from 'antd'

import './EditUser.scss'

const FormItem = Form.Item
const Option = Select.Option

class EditUser extends Component {
  static propTypes = {
    guid: PropTypes.string,
    form: PropTypes.object,
    updateUser: PropTypes.func,
    fetchUserInfo: PropTypes.func,
    isLoading: PropTypes.bool,
    userInfo: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      guid: props.guid,
      confirmDirty: false
    }
  }

  componentDidMount = () => {
    this.fetchUser()
  }

  fetchUser = () => {
    let { guid } = this.state
    guid && store.set('edit_user_id', guid)
    guid = guid || store.get('edit_user_id')
    this.props.fetchUserInfo({
      id: guid,
      rnd: (new Date()).getTime()
    })
    this.setState({
      guid
    })
  }

  handleSubmit = (evt) => {
    const { guid } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      // this.props.addEditUser(values)
      if (!err) {
        console.log('Received values of form: ', {
          id: guid,
          ...values
        })
        this.props.updateUser({
          id: guid,
          ...values
        }, (msg) => {
          message.success(msg, 2, () => {
            browserHistory.push('/admin/user/list')
          })
        }, (msg) => {
          message.error(msg)
        })
      }
    })
  }

  render () {
    const {
      isLoading,
      form,
      userInfo
    } = this.props
    const { getFieldDecorator } = form

    const {
      type,
      nickname,
      phone,
      sex,
      location,
      country
    } = userInfo

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0
    //     },
    //     sm: {
    //       span: 24
    //     }
    //   }
    // }

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}
        getPopupContainer={() => (
          this._form_layout
        )}
      >
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    )

    let sexTxt = '未知'
    if (sex === '1') {
      sexTxt = '男'
    } else {
      sexTxt = '女'
    }

    let isWechatOpTxt = '未知'
    if (type === '2') {
      isWechatOpTxt = '微信运营'
    } else if (type === '1') {
      isWechatOpTxt = '普通用户'
    }

    return (
      <div className='seller-Edit-wrapper'>
        <Helmet>
          <title>编辑用户</title>
        </Helmet>
        <h2 className='page-title'>
          用户
          <small>编辑</small>
        </h2>
        <Card
          title={<span><Icon type='edit' /> 编辑用户</span>}
          extra={<div>
            <Button type='default' shape='circle' icon='reload' title='刷新' onClick={this.fetchUser} />
            <Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/user/list')} />
          </div>}
          bordered={false}>
          <Spin spinning={isLoading} >
            <div ref={el => this._form_layout = el}>
              <Form layout='vertical' onSubmit={this.handleSubmit}>
                <fieldset>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='用户类型'>
                        <span className='ant-form-text'>{isWechatOpTxt}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='昵称'>
                        <span className='ant-form-text'>{nickname}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='性别'>
                        <span className='ant-form-text'>{sexTxt}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='国家省市'>
                        <span className='ant-form-text'>{`${country} ${location}`}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='手机'>
                        {getFieldDecorator('user_phone', {
                          initialValue: phone,
                          rules: [{
                            pattern: /^1(3|4|5|7|8)\d{9}$/,
                            message: '请输入正确的手机号码'
                          }]
                        })(
                          <Input placeholder='手机号码' addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend />
                  <FormItem style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>提交</Button>
                    <Button onClick={() => browserHistory.push('/admin/user/list')}>返回</Button>
                  </FormItem>
                </fieldset>
              </Form>
            </div>
          </Spin>
        </Card>
      </div>
    )
  }
}

const EditUserWrapper = Form.create()(EditUser)

export default EditUserWrapper
