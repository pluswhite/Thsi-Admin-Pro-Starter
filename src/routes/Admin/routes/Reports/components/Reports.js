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
  Spin
} from 'antd'

import './Reports.scss'

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

class Reports extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    form: PropTypes.object,
    fetchReports: PropTypes.func,
    reportList: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSearch = (e) => {
    const { form } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.fetchReports(values)
      }
    })
  }

  render () {
    const {
      isLoading,
      form,
      reportList
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
        <h2 className='page-title'>Reports</h2>
        <div className='report-wrapper'>
          <div className='search-filter-wrapper'>
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
          </div>
          <div className='reports-list'>
            <Table
              columns={columns}
              dataSource={reportList}
              loading={isLoading}
              size='middle'
              bordered />
          </div>
        </div>
      </div>
    )
  }
}

const WrappedReportsForm = Form.create()(Reports)

export default WrappedReportsForm
