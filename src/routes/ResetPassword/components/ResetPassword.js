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

import './resetPassword.scss'

const FormItem = Form.Item

class ResetPassword extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    // handleResetPassword: PropTypes.func.isRequired,
    form: PropTypes.object,
    isAuthenticated: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false
    }
  }

  componentWillMount = () => {
    if (this.props.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  handleResetPasswordSubmit = (evt) => {
    const { redirectPath } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleResetPassword(values, () => {
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
      <div>
        <Helmet>
          <title>重置密码</title>
        </Helmet>
        <Header />
        <div className='page-layout__viewport'>
          <div className='resetPassword-form-wrapper'>
            <h2 className='page-title'>重置密码</h2>
            <Spin spinning={isLoading}>
              <Form onSubmit={this.handleResetPasswordSubmit} className='resetPassword-form'>
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
                  <Button type='primary' htmlType='submit' className='resetPassword-form-button'>
                    ResetPassword
                  </Button>
                </FormItem>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPassword)

export default WrappedResetPasswordForm
