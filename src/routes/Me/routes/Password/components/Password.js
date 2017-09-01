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
    intl: PropTypes.object,
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
      intl,
      isLoading,
      form
    } = this.props

    const {
      formatMessage
    } = intl

    const {
      getFieldDecorator
    } = form

    return (
      <div className='page-layout__viewport'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'modify.password.title',
              defaultMessage: 'Modify Password'
            })}
          </title>
        </Helmet>
        <Row>
          <Col xs={0} md={8} />
          <Col md={8}>
            <h2 className='page-title'>
              {formatMessage({
                id: 'modify.password.title',
                defaultMessage: 'Modify Password'
              })}
            </h2>
            <div className='password-form-wrapper'>
              <Spin spinning={isLoading}>
                <Form onSubmit={this.handlePasswordSubmit} className='password-form'>
                  <FormItem>
                    {getFieldDecorator('oldPassword', {
                      rules: [{
                        required: true,
                        message: formatMessage({ id: 'modify.password.old.required', defaultMessage: 'Please input your old password!' }),
                      }],
                    })(
                      <Input prefix={<Icon type='key' style={{ fontSize: 13 }} />}
                        type='password'
                        placeholder={formatMessage({ id: 'modify.password.old', defaultMessage: 'Old Password' })} />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('newPassword', {
                      rules: [{
                        required: true,
                        message: formatMessage({ id: 'modify.password.new.required', defaultMessage: 'Please input your new password!' }),
                      }, {
                        validator: this.checkConfirm,
                      }],
                    })(
                      <Input prefix={<Icon type='lock' />}
                        type='password'
                        placeholder={formatMessage({ id: 'modify.password.new', defaultMessage: 'New Password' })} />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true,
                        message: formatMessage({ id: 'modify.password.confirm', defaultMessage: 'Please confirm your password!' }),
                      }, {
                        validator: this.checkPassword,
                      }],
                    })(
                      <Input prefix={<Icon type='lock' />}
                        type='password'
                        placeholder={formatMessage({ id: 'modify.password.confirm_password', defaultMessage: 'Confirm Password' })}
                        onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type='primary' htmlType='submit' className='password-form-button'>
                      {formatMessage({
                        id: 'modify.password.title',
                        defaultMessage: 'Modify Password'
                      })}
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
