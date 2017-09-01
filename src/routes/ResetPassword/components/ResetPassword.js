import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import {
  Layout,
  Spin,
  Form,
  Icon,
  Input,
  Button,
  Row,
  Col
} from 'antd'
import { Helmet } from 'react-helmet'

import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

import './resetPassword.scss'

const { Content } = Layout
const FormItem = Form.Item

class ResetPassword extends Component {
  static propTypes = {
    intl: PropTypes.object,
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
      intl,
      isLoading,
      form
    } = this.props

    const {
      getFieldDecorator
    } = form

    const {
      formatMessage
    } = intl

    const {
      showTips
    } = this.state

    return (
      <Layout className='layout'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'reset.password',
              defaultMessage: 'Reset Password'
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
                    id: 'reset.password',
                    defaultMessage: 'Reset Password'
                  })}
                </h2>
                {!showTips &&
                  <div className='resetPassword-form-wrapper'>
                    <Spin spinning={isLoading}>
                      <Form onSubmit={this.handleResetPasswordSubmit} className='resetPassword-form'>
                        <FormItem>
                          {getFieldDecorator('email', {
                            rules: [
                              {
                                type: 'email',
                                message: formatMessage({ id: 'reset.password.email.format', defaultMessage: 'The input is not valid E-mail!' }),
                              },
                              {
                                required: true,
                                message: formatMessage({ id: 'reset.password.email.required', defaultMessage: 'Please input your E-mail!' }),
                              }
                            ],
                          })(
                            <Input prefix={<Icon type='mail' style={{ fontSize: 13 }} />}
                              placeholder={formatMessage({ id: 'reset.password.email', defaultMessage: 'Email' })} />
                          )}
                        </FormItem>
                        <FormItem>
                          <Button type='primary' htmlType='submit' className='resetPassword-form-button'>
                            {formatMessage({
                              id: 'reset.password',
                              defaultMessage: 'Reset Password'
                            })}
                          </Button>
                        </FormItem>
                      </Form>
                    </Spin>
                  </div>
                }
                {showTips &&
                  <div className='reset-password-tips'>
                    <p className='text-success'>
                      {formatMessage({
                        id: 'reset.password.tips.send',
                        defaultMessage: 'We send a link to your email!'
                      })}
                    </p>
                    <p>
                      {formatMessage({
                        id: 'reset.password.tips.link',
                        defaultMessage: 'Please click link to reset your password.'
                      })}
                    </p>
                  </div>
                }
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

const WrappedResetPasswordForm = Form.create()(ResetPassword)

export default WrappedResetPasswordForm
