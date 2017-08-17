import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'

import Header from 'vcms/Header'

import './login.scss'

const FormItem = Form.Item

class Login extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false,
    }
  }

  handleLoginSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleLogin(values)
      }
    })
  }

  render () {
    const {
      getFieldDecorator
    } = this.props.form

    return (
      <div>
        <Helmet>
          <title>登录</title>
        </Helmet>
        <Header />
        <div className='page-layout__viewport'>
          <div id='login-form-wrapper'>
            <Form onSubmit={this.handleLoginSubmit} className='login-form'>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    }
                  ],
                })(
                  <Input prefix={<Icon type='mail' style={{ fontSize: 13 }} />} placeholder='Email' />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: 'Please input your Password!'
                  }],
                })(
                  <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='Password' />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className='login-form-forgot' href=''>Forgot password</a>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  Login
                </Button>
                Or <Link to='/register'>register now!</Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm
