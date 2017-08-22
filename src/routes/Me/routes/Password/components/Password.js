import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'

import './password.scss'

const FormItem = Form.Item

class Password extends Component {
  static propTypes = {
    // handlePassword: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false,
      redirectPath: props.redirectPath
    }
  }

  handlePasswordSubmit = (evt) => {
    const { redirectPath } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handlePassword(values, () => {
          if (redirectPath) {
            browserHistory.push(redirectPath)
          } else {
            browserHistory.push('/')
          }
        })
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
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
      getFieldDecorator
    } = this.props.form

    return (
      <div>
        <Helmet>
          <title>修改密码</title>
        </Helmet>
        <div id='password-form-wrapper'>
          <Form onSubmit={this.handlePasswordSubmit} className='password-form'>
            <FormItem>
              {getFieldDecorator('old-password', {
                rules: [{
                  required: true,
                  message: 'Please input your Password!'
                }],
              })(
                <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='Old Password' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('new-password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input prefix={<Icon type='lock' />} type='password' placeholder='New Password' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input prefix={<Icon type='lock' />} type='password' placeholder='Confirm Password' onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit' className='password-form-button'>
                Modify Password
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedPasswordForm = Form.create()(Password)

export default WrappedPasswordForm
