import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import {
  Spin,
  Form,
  Icon,
  Input,
  Button
} from 'antd'
import { Helmet } from 'react-helmet'

import Header from 'vctns/HeaderContainer'

import './resetPassword.scss'

const FormItem = Form.Item

class ResetPassword extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleResetPassword: PropTypes.func.isRequired,
    form: PropTypes.object,
    isAuthenticated: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false,
      showTips: false
    }
  }

  componentWillMount = () => {
    if (this.props.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  handleResetPasswordSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleResetPassword(values, () => {
          console.log('Success!')
          this.setState({
            showTips: true
          })
        }, () => {
          console.log('error!')
          this.setState({
            showTips: false
          })
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

    const {
      showTips
    } = this.state

    return (
      <div>
        <Helmet>
          <title>Reset Password</title>
        </Helmet>
        <Header />
        <div className='page-layout__viewport'>
          <h2 className='page-title'>Reset Password</h2>
          {!showTips &&
            <div className='resetPassword-form-wrapper'>
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
                      Reset Password
                    </Button>
                  </FormItem>
                </Form>
              </Spin>
            </div>
          }
          {showTips &&
            <div className='reset-password-tips'>
              <p className='text-success'>We send a link to your email! </p>
              <p>Please click link to reset your password. </p>
            </div>
          }
        </div>
      </div>
    )
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPassword)

export default WrappedResetPasswordForm
