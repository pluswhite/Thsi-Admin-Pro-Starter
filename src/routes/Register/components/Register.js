import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import {
  Spin,
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Row,
  Col
} from 'antd'
import { Helmet } from 'react-helmet'

import Header from 'vctns/HeaderContainer'

import './Register.scss'

const FormItem = Form.Item

class Register extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleRegister: PropTypes.func.isRequired,
    form: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        this.props.handleRegister(values, () => {
          browserHistory.push('/')
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
      isLoading,
      form
    } = this.props

    const { getFieldDecorator } = form

    return (
      <div className='page-layout__viewport'>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <Header />
        <div className='page-layout__container'>
          <Row>
            <Col xs={0} md={8} />
            <Col md={8}>
              <h2 className='page-title'>Register</h2>
              <div className='reigster-form-wrapper'>
                <Spin spinning={isLoading}>
                  <Form onSubmit={this.handleSubmit} className='register-form'>
                    <FormItem>
                      {getFieldDecorator('email', {
                        rules: [{
                          type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                          required: true, message: 'Please input your E-mail!',
                        }],
                      })(
                        <Input prefix={<Icon type='mail' />} placeholder='E-mail' />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{
                          required: true, message: 'Please input your password!',
                        }, {
                          validator: this.checkConfirm,
                        }],
                      })(
                        <Input prefix={<Icon type='lock' />} type='password' placeholder='Password' />
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
                      {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                      })(
                        <Input prefix={<Icon type='user' />} suffix={(
                          <span>
                            <Tooltip title='What do you want other to call you?'>
                              <Icon type='question-circle-o' />
                            </Tooltip>
                          </span>
                        )} placeholder='Nickname' />
                      )}
                    </FormItem>
                    <FormItem style={{ marginBottom: 8 }}>
                      {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                      })(
                        <Checkbox>I have read the <a href='#'>agreement</a></Checkbox>
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type='primary' htmlType='submit' size='large' className='register-form-button'>Register</Button>
                    </FormItem>
                  </Form>
                </Spin>
              </div>
            </Col>
            <Col xs={0} md={8} />
          </Row>
        </div>
      </div>
    )
	}
}

const WrappedRegistrationForm = Form.create()(Register)

export default WrappedRegistrationForm
