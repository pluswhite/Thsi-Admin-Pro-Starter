import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import {
  Spin,
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd'
import { Helmet } from 'react-helmet'

import Header from 'vctns/HeaderContainer'

import './login.scss'

const FormItem = Form.Item

class Login extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleLogin: PropTypes.func.isRequired,
    form: PropTypes.object,
    redirectPath: PropTypes.string,
    isAuthenticated: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false,
      redirectPath: props.redirectPath
    }
  }

  componentWillMount = () => {
    if (this.props.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  handleLoginSubmit = (evt) => {
    const { redirectPath } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleLogin(values, () => {
          if (redirectPath) {
            browserHistory.push(redirectPath)
          } else {
            browserHistory.push('/')
          }
        })
      }
    })
  }

  render () {
    const {
      isLoading,
      form
    } = this.props

    const {
      getFieldDecorator
    } = form

    return (
      <div className='page-layout__viewport'>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Header />
        <div className='page-layout__container'>
          <h2 className='page-title'>Login</h2>
          <div className='login-form-wrapper'>
            <Spin spinning={isLoading}>
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
                  <Link className='login-form-forgot' to='/reset-psw'>Forgot password</Link>
                  <Button type='primary' htmlType='submit' className='login-form-button'>
                    Login
                  </Button>
                  Or <Link to='/register'>register now!</Link>
                </FormItem>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm
