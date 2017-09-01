import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import {
  Layout,
  Spin,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message
} from 'antd'
import { Helmet } from 'react-helmet'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

import './login.scss'

const { Content } = Layout
const FormItem = Form.Item

class Login extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleLogin: PropTypes.func.isRequired,
    form: PropTypes.object,
    redirectPath: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    intl: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false,
      redirectPath: props.redirectPath
    }
    // console.log(props.intl)
  }

  componentWillMount = () => {
    const { redirectPath } = this.state
    if (this.props.isAuthenticated) {
      if (redirectPath) {
        browserHistory.push(redirectPath)
      } else {
        browserHistory.push('/')
      }
    }
  }

  handleLoginSubmit = (evt) => {
    const { redirectPath } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        this.props.handleLogin(values, () => {
          if (redirectPath) {
            browserHistory.push(redirectPath)
          } else {
            browserHistory.push('/admin/dashboard')
          }
        }, (msg) => {
          message.error(msg)
        })
      }
    })
  }

  render () {
    const {
      isLoading,
      form,
      intl
    } = this.props

    const {
      getFieldDecorator
    } = form

    const {
      formatMessage
    } = intl

    // console.log(this.props)

    return (
      <Layout className='layout'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'login.title',
              defaultMessage: 'Login'
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
                    id: 'login.title',
                    defaultMessage: 'Login'
                  })}
                </h2>
                <div className='login-form-wrapper'>
                  <Spin spinning={isLoading}>
                    <Form onSubmit={this.handleLoginSubmit} className='login-form'>
                      <FormItem>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              type: 'email',
                              message: formatMessage({
                                id: 'login.email.format',
                                defaultMessage: 'The input is not valid E-mail!'
                              })
                            },
                            {
                              required: true,
                              message: formatMessage({
                                id: 'login.email.required',
                                defaultMessage: 'Please input your E-mail!'
                              }),
                            }
                          ],
                        })(
                          <Input prefix={<Icon type='mail' style={{ fontSize: 13 }} />}
                            placeholder={formatMessage({
                              id: 'login.email',
                              defaultMessage: 'Email'
                            })} />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true,
                            message: formatMessage({
                              id: 'login.password.required',
                              defaultMessage: 'Please input your Password!'
                            })
                          }],
                        })(
                          <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                            type='password'
                            placeholder={formatMessage({
                              id: 'login.password',
                              defaultMessage: 'Password'
                            })} />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>
                            {formatMessage({
                              id: 'login.remember_me',
                              defaultMessage: 'Remember me'
                            })}
                          </Checkbox>
                        )}
                        <Link className='login-form-forgot' to='/reset-psw'>
                          {formatMessage({
                            id: 'login.forgot_password',
                            defaultMessage: 'Forgot password'
                          })}
                        </Link>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                          {formatMessage({
                            id: 'login.title',
                            defaultMessage: 'Login'
                          })}
                        </Button>
                        {formatMessage({
                          id: 'login.register.tips',
                          defaultMessage: 'Or '
                        })}
                        <Link to='/register'>
                          {formatMessage({
                            id: 'login.register',
                            defaultMessage: 'Register now!'
                          })}
                        </Link>
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

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm
