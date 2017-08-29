import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Icon,
  Input,
  Button,
  Spin,
  Message,
  Row,
  Col,
  message
} from 'antd'
import { Helmet } from 'react-helmet'

import './password.scss'

const FormItem = Form.Item

class Password extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleModifyPassword: PropTypes.func.isRequired,
    form: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false
    }
  }

  handlePasswordSubmit = (evt) => {
    const form = this.props.form
    evt.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleModifyPassword(values, () => {
          Message.success('Modify password successifully!')
          form.resetFields()
        }, (msg) => {
          message.error(msg)
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
    if (value && value !== form.getFieldValue('newPassword')) {
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
      isLoading,
      form
    } = this.props

    const {
      getFieldDecorator
    } = form

    return (
      <div className='page-layout__container'>
        <Helmet>
          <title>Modify Password</title>
        </Helmet>
        <Row>
          <Col xs={0} md={8} />
          <Col md={8}>
            <h2 className='page-title'>Modify Password</h2>
            <div className='password-form-wrapper'>
              <Spin spinning={isLoading}>
                <Form onSubmit={this.handlePasswordSubmit} className='password-form'>
                  <FormItem>
                    {getFieldDecorator('oldPassword', {
                      rules: [{
                        required: true,
                        message: 'Please input your Password!'
                      }],
                    })(
                      <Input prefix={<Icon type='key' style={{ fontSize: 13 }} />} type='password' placeholder='Old Password' />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('newPassword', {
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
              </Spin>
            </div>
          </Col>
          <Col xs={0} md={8} />
        </Row>
      </div>
    )
  }
}

const WrappedPasswordForm = Form.create()(Password)

export default WrappedPasswordForm
