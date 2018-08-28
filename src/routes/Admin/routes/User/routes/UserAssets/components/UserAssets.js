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
  InputNumber,
  Button,
  Spin,
  message,
  Avatar,
  Table
} from 'antd'

import './UserAssets.scss'

const FormItem = Form.Item

const pageSizeOptions = ['10', '30', '50', '100']
const paginationOptions = {
  size: 'small',
  showSizeChanger: true,
  pageSizeOptions,
  showQuickJumper: true,
  showTotal: total => {
    return `总数 ${total} 项`
  }
}

class UserAssets extends Component {
  static propTypes = {
    guid: PropTypes.string,
    form: PropTypes.object,
    updateUserAssetsInfo: PropTypes.func,
    fetchUserAssetsInfo: PropTypes.func,
    isLoading: PropTypes.bool,
    userAssetsInfo: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      guid: props.guid,
      editable: false,
      pagination: {
        current: 1,
        pageSize: parseInt(pageSizeOptions[0], 10)
      }
    }
  }

  componentDidMount = () => {
    this.fetchInfo()
  }

  fetchInfo = (params = {}) => {
    let { guid, pagination } = this.state
    guid && store.set('assets_user_id', guid)
    guid = guid || store.get('assets_user_id')

    this.props.fetchUserAssetsInfo({
      current: 1,
      pageSize: pagination.pageSize,
      ...params,
      id: guid
    },
      data => {
        pagination.total = data.total
        pagination.current = data.current
        pagination.pageSize = data.pageSize
        this.setState({
          pagination
        })
      },
      msg => {
        message.error(msg || '获取失败！')
      }
    )
    this.setState({
      guid
    })
  }

  handleReload = e => {
    e.preventDefault()
    this.fetchInfo()
  }

  handleSubmit = (evt) => {
    const { guid } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      // this.props.addUserAssets(values)
      if (!err) {
        this.props.updateUserAssetsInfo({
          id: guid,
          ...values,
          rnd: Date.now()
        }, (msg) => {
          message.success(msg || '提交成功！')
          this.setState({
            editable: false
          })
        }, (msg) => {
          message.error(msg || '提交失败！')
        })
      }
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetchInfo({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  renderColumns = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '订单编号',
        dataIndex: 'order_id',
        key: 'order_id',
      },
      {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '返现金额（￥）',
        dataIndex: 'rebate_amount',
        key: 'rebate_amount',
        render: text => Number(text).toFixed(2)
      }
    ]
  }

  render() {
    const {
      isLoading,
      form,
      userAssetsInfo
    } = this.props
    const { editable, pagination } = this.state
    const { getFieldDecorator } = form

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }
    const {
      userInfo,
      list
    } = userAssetsInfo

    return (
      <div className='user-assets-wrapper'>
        <Helmet>
          <title>用户资产</title>
        </Helmet>
        <h2 className='page-title'>
          用户
          <small>资产</small>
        </h2>
        <Card
          title={<span><Icon type='pay-circle-o' /> 用户资产</span>}
          extra={<div>
            <Button type='default' shape='circle' icon='reload' title='刷新' onClick={e => this.handleReload(e)} />
            <Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/user/list')} />
          </div>}
          bordered={false}>
          <Spin spinning={isLoading} >
            <div ref={el => { this._form_layout = el }}>
              <Form layout='vertical' onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend>用户信息</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='用户ID'>
                        <span className='ant-form-text'>{userInfo.id}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='用户头像/昵称'
                      >
                        <Avatar src={userInfo.avatar} />
                        <span style={{ marginLeft: 10 }}>{userInfo.name}</span>
                      </FormItem>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend>资产信息</legend>
                  <Row gutter={24}>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='待返利'>
                        {/* {getFieldDecorator('need_rebate', {
                          initialValue: Number(userInfo.need_rebate) || 0,
                          rules: [{
                            type: 'number',
                            message: '请输入待返利金额'
                          }]
                        })(
                          <InputNumber
                            placeholder='请输入待返利金额'
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')}
                            precision={2}
                            min={0}
                            style={{
                              width: '100%'
                            }}
                            disabled={!editable}
                          />
                        )} */}
                        <span>{`￥ ${userInfo.need_rebate || 0}`}</span>
                      </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='累计返利'>
                        {/* {getFieldDecorator('total_rebate', {
                          initialValue: Number(userInfo.total_rebate) || 0,
                          rules: [{
                            type: 'number',
                            message: '请输入累计返利金额'
                          }]
                        })(
                          <InputNumber
                            placeholder='请输入累计返利金额'
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')}
                            precision={2}
                            min={0}
                            style={{
                              width: '100%'
                            }}
                            disabled={!editable}
                          />
                        )} */}
                        <span>{`￥ ${userInfo.total_rebate || 0}`}</span>
                      </FormItem>
                    </Col>
                  </Row>
                  {/* <FormItem style={{ textAlign: 'right' }}>
                    {editable ? [
                      <Button
                        key='submit'
                        type='primary'
                        htmlType='submit'
                        style={{ marginRight: 10 }}
                      >提交</Button>,
                      <Button
                        onClick={() => {
                          this.setState({
                            editable: false
                          })
                        }}
                        key='cancle'
                      >取消</Button>
                    ] : (
                        <Button type='primary' onClick={() => {
                          this.setState({
                            editable: true
                          })
                        }} >编辑</Button>
                      )}
                  </FormItem> */}
                </fieldset>
                <legend>返利明细</legend>
                <fieldset>
                  <Table
                    rowKey='id'
                    size='small'
                    columns={this.renderColumns()}
                    dataSource={list}
                    pagination={{
                      ...paginationOptions,
                      ...pagination
                    }}
                    loading={isLoading}
                    onChange={this.handleTableChange}
                  // scroll={{ x: 1500 }}
                  />
                </fieldset>
              </Form>
            </div>
          </Spin>
        </Card>
      </div>
    )
  }
}

const UserAssetsWrapper = Form.create()(UserAssets)

export default UserAssetsWrapper
