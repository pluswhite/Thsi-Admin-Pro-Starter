import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { browserHistory } from 'react-router'
import store from 'store'
import {
  Row,
  Col,
  Card,
  Icon,
  Form,
  Input,
  Button,
  Select,
  Spin,
  message
} from 'antd'
// import {
//   requestUploadUrl
// } from 'vstore/auth'

import './EditAccount.scss'

const FormItem = Form.Item
const Option = Select.Option

class EditAccount extends Component {
  static propTypes = {
    form: PropTypes.object,
    guid: PropTypes.string,
    isLoading: PropTypes.bool,
    accountInfo: PropTypes.object,
    updateAccountInfo: PropTypes.func,
    fetchAccountItem: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      guid: props.guid,
      confirmDirty: false
    }
  }

  componentDidMount = () => {
    this.fetchAccount()
  }

  fetchAccount = () => {
    let { guid } = this.state
    guid && store.set('edit_account_id', guid)
    guid = guid || store.get('edit_account_id')
    this.props.fetchAccountItem({
      id: guid,
      type: 'edit',
      rnd: (new Date()).getTime()
    })
    this.setState({
      guid
    })
  }

  handleSubmit = (evt) => {
    const {
      guid
    } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      // this.props.addEditAccount(values)
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.updateAccountInfo({
          id: guid,
          type: 'edit',
          ...values
        }, (msg) => {
          message.success(msg, 2, () => {
            browserHistory.push('/admin/account/list')
          })
        }, (msg) => {
          message.error(msg)
        })
      }
    })
  }

  render () {
    const {
      form,
      isLoading,
      accountInfo
    } = this.props

    const { getFieldDecorator } = form

    const {
      roleList,
      accountItem
    } = accountInfo

    const {
      accountEmail,
      accountName,
      accountRole
    } = accountItem

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }

    let roleShowList = roleList.map((item, index) => {
      const {
        label,
        value
      } = item
      return (
        <Option key={value}>{label}</Option>
      )
    })

    return (
      <div className='page-edit-account__wrapper'>
        <Helmet>
          <title>编辑账号</title>
        </Helmet>
        <h2 className='page-title'>
          账号
          <small>编辑</small>
        </h2>
        <Card
          title={<span><Icon type='edit' /> 编辑账号</span>}
          extra={
            <div>
              <Button type='default' shape='circle' icon='reload' title='刷新' onClick={this.fetchAccount} />
              <Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/account/list')} />
            </div>
          }
          bordered={false}
        >
          <Spin spinning={isLoading}>
            <div ref={el => this._form_layout = el}>
              <Form layout='vertical' onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend>账号信息</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='邮箱'>
                        <span className='ant-form-text'>{accountEmail}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='账号名称'>
                        {getFieldDecorator('account_name', {
                          initialValue: accountName,
                          rules: [
                            {
                              required: true,
                              message: '请输入账户名称!'
                            }
                          ]
                        })(
                          <Input placeholder='账号名称' />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend>角色设置</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='账户角色'>
                        {getFieldDecorator('account_role', {
                          initialValue: accountRole,
                          rules: [
                            {
                              required: true,
                              message: '请选择账户角色'
                            }
                          ]
                        })(
                          <Select placeholder='请选择账户角色'
                            getPopupContainer={() => (
                              this._form_layout
                            )}
                          >
                            {roleShowList}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend />
                  <FormItem style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>提交</Button>
                    <Button onClick={() => browserHistory.push('/admin/account/list')}>返回</Button>
                  </FormItem>
                </fieldset>
              </Form>
            </div>
          </Spin>
        </Card>
      </div>
    )
  }
}

const EditAccountWrapper = Form.create()(EditAccount)

export default EditAccountWrapper
