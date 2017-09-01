import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import {
  Layout,
  Spin,
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Row,
  Col,
  message
} from 'antd'
import { Helmet } from 'react-helmet'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

import './Register.scss'

const { Content } = Layout
const FormItem = Form.Item

class Register extends Component {
  static propTypes = {
    intl: PropTypes.object,
    isLoading: PropTypes.bool,
    handleRegister: PropTypes.func.isRequired,
    form: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      readAgt: false,
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
    const { formatMessage } = this.props.intl
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({
        id: 'register.password.consistent',
        defaultMessage: 'Two passwords that you enter is inconsistent!'
      }))
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

  onReadAgtChange = (evt) => {
    // console.log(evt.target.checked)
    this.setState({
      readAgt: evt.target.checked
    })
  }

  render () {
    const {
      isLoading,
      form,
      intl
    } = this.props

    const { getFieldDecorator } = form
    const { formatMessage } = intl

    const { readAgt } = this.state

    return (
      <Layout className='layout'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'register.title',
              defaultMessage: 'Register'
            })}
          </title>
        </Helmet>
        <Header />
        <Content>
          <div className='page-layout__viewport'>
            <Row>
              <Col xs={0} md={8} />
              <Col md={8}>
                <h2 className='page-title'>
                  {formatMessage({
                    id: 'register.title',
                    defaultMessage: 'Register'
                  })}
                </h2>
                <div className='reigster-form-wrapper'>
                  <Spin spinning={isLoading}>
                    <Form onSubmit={this.handleSubmit} className='register-form'>
                      <FormItem>
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: formatMessage({ id: 'register.email.format', defaultMessage: 'The input is not valid E-mail!' }),
                          }, {
                            required: true, message: formatMessage({ id: 'register.email.required', defaultMessage: 'Please input your E-mail!' }),
                          }],
                        })(
                          <Input prefix={<Icon type='mail' />}
                            placeholder={formatMessage({ id: 'register.email', defaultMessage: 'Email' })} />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true, message: formatMessage({ id: 'register.password.required', defaultMessage: 'Please input your password!' }),
                          }, {
                            validator: this.checkConfirm,
                          }],
                        })(
                          <Input prefix={<Icon type='lock' />}
                            type='password'
                            placeholder={formatMessage({ id: 'register.password', defaultMessage: 'Password' })} />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('confirm', {
                          rules: [{
                            required: true, message: formatMessage({ id: 'register.password.confirm', defaultMessage: 'Please confirm your password!' }),
                          }, {
                            validator: this.checkPassword,
                          }],
                        })(
                          <Input prefix={<Icon type='lock' />}
                            type='password'
                            placeholder={formatMessage({ id: 'register.confirm_password', defaultMessage: 'Confirm Password' })}
                            onBlur={this.handleConfirmBlur} />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('nickname', {
                          rules: [{
                            required: true,
                            message: formatMessage({ id: 'register.nickname.required', defaultMessage: 'Please input your nickname!' }),
                            whitespace: true
                          }],
                        })(
                          <Input prefix={<Icon type='user' />} suffix={(
                            <span>
                              <Tooltip title={formatMessage({ id: 'register.nickname.tips', defaultMessage: 'What do you want other to call you?' })}>
                                <Icon type='question-circle-o' />
                              </Tooltip>
                            </span>
                          )} placeholder={formatMessage({ id: 'register.nickname', defaultMessage: 'Nickname' })} />
                        )}
                      </FormItem>
                      <FormItem style={{ marginBottom: 8 }}>
                        {getFieldDecorator('agreement', {
                          valuePropName: 'checked',
                        })(
                          <Checkbox onChange={this.onReadAgtChange}>{formatMessage({ id: 'register.agreement.tips', defaultMessage: 'I have read the' })} <a href='#'>{formatMessage({ id: 'register.agreement', defaultMessage: 'agreement' })}</a></Checkbox>
                        )}
                      </FormItem>
                      <FormItem>
                        <Button
                          type='primary'
                          htmlType='submit'
                          size='large'
                          disabled={!readAgt}
                          className='register-form-button'>
                          {formatMessage({
                            id: 'register.title',
                            defaultMessage: 'Register'
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
        </Content>
        <Footer />
      </Layout>
    )
  }
}

const WrappedRegistrationForm = Form.create()(Register)

export default WrappedRegistrationForm
