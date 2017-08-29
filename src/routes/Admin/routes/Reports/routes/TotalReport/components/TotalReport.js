import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  DatePicker,
  Table,
  Spin,
  Card
} from 'antd'

import './TotalReport.scss'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href='#'>{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href='#'><Icon type='edit' /></a>
      <span className='ant-divider' />
      <a href='#'><Icon type='delete' /></a>
      <span className='ant-divider' />
      <a href='#' className='ant-dropdown-link'>
        Actions <Icon type='down' />
      </a>
    </span>
  ),
}]

class TotalReport extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    form: PropTypes.object,
    reportList: PropTypes.array.isRequired,
    fetchTotalReport: PropTypes.func.isRequired,
    clearTotalReport: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSearch = (evt) => {
    const { form, fetchTotalReport } = this.props
    evt.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        fetchTotalReport(values)
      }
    })
  }

  handleReset = (evt) => {
    const { form, clearTotalReport } = this.props
    evt.preventDefault()
    clearTotalReport()
    form.resetFields()
  }

  render () {
    const {
      isLoading,
      form,
      reportList,
    } = this.props

    const {
      getFieldDecorator
    } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }

    return (
      <div className='reports-wrapper'>
        <Helmet>
          <title>Total Report</title>
        </Helmet>
        <h2 className='page-title'>Total Report</h2>
        <div className='report-wrapper'>
          <div className='search-filter-wrapper'>
            <Card
              title={<span><Icon type='filter' /> Filter</span>}
              noHovering={true}
              bordered={false}>
              <Form className='search-form' onSubmit={this.handleSearch}>
                <Row gutter={40}>
                  <Col span={8} key='name'>
                    <FormItem {...formItemLayout} label='Name'>
                      {getFieldDecorator('name')(
                        <Input placeholder='placeholder' />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8} key='type'>
                    <FormItem {...formItemLayout} label='Type'>
                      {getFieldDecorator('type')(
                        <Input placeholder='placeholder' />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8} key='date'>
                    <FormItem {...formItemLayout} label='Date'>
                      {getFieldDecorator('date', {
                        rules: [{
                          type: 'array',
                          message: 'Please select time!'
                        }]
                      })(
                        <RangePicker />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' icon='search' loading={isLoading}>
                      Search
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      Clear
                    </Button>
                    {/* <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                      Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                    </a> */}
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
          <div className='reports-list'>
            <Card
              title={<span><Icon type='bars' /> Result</span>}
              noHovering={true}
              bordered={false}>
              <Table
                columns={columns}
                dataSource={reportList}
                loading={isLoading}
                size='middle'
                bordered />
              </Card>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedTotalReportForm = Form.create()(TotalReport)

export default WrappedTotalReportForm
