import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import {
  Form,
  Icon,
  Input,
  Button,
  Spin,
  Message,
  Row,
  Col,
  Card,
  message
} from 'antd'
import { Helmet } from 'react-helmet'

import './Password.scss'

const FormItem = Form.Item

class Password extends Component {
  static propTypes = {
    intl: PropTypes.object,
    isLoading: PropTypes.bool,
    handleModifyPassword: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    form: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  handlePasswordSubmit = (evt) => {
    const form = this.props.form
    evt.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleModifyPassword(values, (msg) => {
          Message.success(msg, 3, () => {
            this.props.handleLogout(() => {
              browserHistory.push('/login')
            })
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
    const { formatMessage } = this.props.intl
    if (value && value !== form.getFieldValue('newPassword')) {
      callback && callback(formatMessage({
        id: 'modify.password.consistent',
        defaultMessage: 'Two passwords that you enter is inconsistent!'
      }))
    } else {
      callback && callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render () {
    const {
      isLoading,
      form
    } = this.props

    const {
      getFieldDecorator
    } = form

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }

    return (
      <div className='page-password__wrapper'>
        <Helmet>
          <title>修改密码</title>
        </Helmet>
        <h2 className='page-title'>
          密码
          <small>修改</small>
        </h2>
        <div className='profile-wrapper'>
          <Card
            title={<span><Icon type=' edit' /> 修改密码</span>}
            extra={<Button type='default' shape='circle' icon='rollback' title='返回' onClick={() => browserHistory.goBack()} />}
            bordered={false}>
            <Spin spinning={isLoading}>
              <Form layout='vertical' onSubmit={this.handlePasswordSubmit} className='password-form'>
                <fieldset>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='旧密码'>
                        {getFieldDecorator('oldPassword', {
                          rules: [
                            {
                              required: true,
                              message: '请输入您的旧密码',
                            },
                            {
                              min: 6,
                              message: '密码至少为6位'
                            }
                          ]
                        })(
                          <Input prefix={<Icon type='key' style={{ fontSize: 13 }} />}
                            type='password'
                            placeholder='请输入您的旧密码' />
                        )}
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='新密码'>
                        {getFieldDecorator('newPassword', {
                          rules: [
                            {
                              required: true,
                              message: '请输入您的新密码',
                            },
                            {
                              min: 6,
                              message: '密码至少为6位'
                            },
                            {
                              validator: this.checkConfirm,
                            }
                          ],
                        })(
                          <Input prefix={<Icon type='lock' />}
                            type='password'
                            placeholder='至少6位密码，区分大小写' />
                        )}
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='确认密码'>
                        {getFieldDecorator('confirm', {
                          rules: [
                            {
                              required: true,
                              message: '请再次确认您的密码',
                            },
                            {
                              min: 6,
                              message: '密码至少为6位'
                            },
                            {
                              validator: this.checkPassword,
                            }
                          ],
                        })(
                          <Input prefix={<Icon type='lock' />}
                            type='password'
                            placeholder='确认密码'
                            onBlur={this.handleConfirmBlur} />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend />
                  <FormItem style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' className='password-form-button' style={{ marginRight: 10 }}>提交</Button>
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

const WrappedPasswordForm = Form.create()(Password)

export default WrappedPasswordForm
