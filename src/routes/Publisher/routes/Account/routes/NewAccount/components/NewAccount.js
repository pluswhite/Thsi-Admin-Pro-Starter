import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { browserHistory } from 'react-router'
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
// import {
//   requestUploadUrl
// } from 'vstore/auth'

import './NewAccount.scss'

const FormItem = Form.Item
const Option = Select.Option

class NewAccount extends Component {
  static propTypes = {
    form: PropTypes.object,
    isLoading: PropTypes.bool,
    emailChecking: PropTypes.bool,
    accountInfo: PropTypes.object,
    updateAccountInfo: PropTypes.func,
    fetchAccountItem: PropTypes.func,
    fetchAccountEmailUnique: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
  }

  componentDidMount = () => {
    this.props.fetchAccountItem({
      guid: '',
      type: 'new',
      rnd: (new Date()).getTime()
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      // this.props.addNewAccount(values)
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.updateAccountInfo({
          ...values,
          type: 'new'
        }, (msg) => {
          message.success(msg, 2, () => {
            // console.log('3秒后跳转')
            browserHistory.push('/admin/account/list')
          })
        }, (msg) => {
          message.error(msg)
        })
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    })
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('account_pwd')) {
      callback('两次出入的密码不一致')
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['account_confirm_pwd'], { force: true })
    }
    callback()
  }

  checkEmail = (rule, value, callback) => {
    // const form = this.props.form
    // console.log(value)
    // console.log(form.getFieldValue('account_email'))
    // form.validateFields(['account_email'])
    if (value !== '' &&
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      this.props.fetchAccountEmailUnique({
        email: value,
        rnd: (new Date()).getTime()
      }, () => {
        callback()
      }, (msg) => {
        callback(msg)
      })
    } else {
      callback()
    }
  }

  render () {
    const {
      form,
      isLoading,
      emailChecking,
      accountInfo
    } = this.props

    const {
      getFieldDecorator,
      getFieldError
    } = form

    const {
      roleList
    } = accountInfo

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }

    let roleShowList = roleList.map((item, index) => {
      const {
        label,
        value
      } = item
      return (
        <Option key={value}>{label}</Option>
      )
    })

    return (
      <div className='page-new-account__wrapper'>
        <Helmet>
          <title>新增账号</title>
        </Helmet>
        <h2 className='page-title'>
          账号
          <small>新增</small>
        </h2>
        <Card
          title={<span><Icon type='plus' /> 新增账号</span>}
          extra={<Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/account/list')} />}
          bordered={false}
        >
          <Spin spinning={isLoading}>
            <div ref={el => this._form_layout = el}>
              <Form layout='vertical' onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend>账号信息</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        validateStatus={
                          emailChecking
                          ? 'validating'
                          : getFieldError('account_email')
                          ? 'error'
                          : ''
                        }
                        {...formItemLayout}
                        label='邮箱'>
                        {getFieldDecorator('account_email', {
                          validateTrigger: 'onBlur',
                          rules: [
                            {
                              type: 'email',
                              message: '请输入合法的邮箱地址'
                            },
                            {
                              required: true,
                              message: '请输入登录邮箱',
                            },
                            {
                              validator: this.checkEmail
                            }
                          ],
                        })(
                          <Input placeholder='example@example.com' readOnly={emailChecking} />
                        )}
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='账号名称'>
                        {getFieldDecorator('account_name', {
                          rules: [
                            {
                              required: true,
                              message: '请输入账户名称!'
                            }
                          ]
                        })(
                          <Input placeholder='账号名称' />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend>账号密码</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='密码'>
                        {getFieldDecorator('account_pwd', {
                          rules: [
                            {
                              required: true,
                              message: '请输入密码'
                            },
                            {
                              min: 6,
                              message: '密码至少为6位'
                            },
                            {
                              validator: this.checkConfirm
                            }
                          ]
                        })(
                          <Input type='password' placeholder='至少6位密码，区分大小写' />
                        )}
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='确认密码'>
                        {getFieldDecorator('account_confirm_pwd', {
                          rules: [
                            {
                              required: true,
                              message: '确认密码'
                            },
                            {
                              min: 6,
                              message: '密码至少为6位'
                            },
                            {
                              validator: this.checkPassword
                            }
                          ]
                        })(
                          <Input type='password' placeholder='确认密码' onBlur={this.handleConfirmBlur} />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend>角色设置</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='账户角色'>
                        {getFieldDecorator('account_role', {
                          rules: [
                            {
                              required: true,
                              message: '请选择账户角色'
                            }
                          ]
                        })(
                          <Select placeholder='请选择账户角色'
                            getPopupContainer={() => (
                              this._form_layout
                            )}
                          >
                            {roleShowList}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend />
                  <FormItem style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>提交</Button>
                    <Button onClick={() => browserHistory.push('/admin/account/list')}>返回</Button>
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

const NewAccountWrapper = Form.create()(NewAccount)

export default NewAccountWrapper
