import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Select, DatePicker, Button } from 'antd'

import moment from 'moment'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
const formItemLayout = {
  // labelCol: { span: 10, offset: 2 },
  wrapperCol: { span: 20 }
}

class Filter extends Component {
  render () {
    const { form, isLoading, handleSearch, handleReset } = this.props
    const { getFieldDecorator } = form
    return (
      <div ref={el => (this._form_layout = el)}>
        <Form className='search-form' layout='vertical' onSubmit={handleSearch}>
          <Row gutter={24}>
            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
              <FormItem {...formItemLayout} label='ID编号'>
                {getFieldDecorator('id', {
                  initialValue: ''
                })(<Input placeholder='ID编号' />)}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
              <FormItem {...formItemLayout} label='名称'>
                {getFieldDecorator('adZones_name', {
                  initialValue: ''
                })(<Input placeholder='名称' />)}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
              <FormItem {...formItemLayout} label='发布状态'>
                {getFieldDecorator('status', {
                  initialValue: ''
                })(
                  <Select placeholder='发布状态' getPopupContainer={() => this._form_layout}>
                    <Option value=''>全部</Option>
                    <Option value='1'>未开始</Option>
                    <Option value='2'>执行中</Option>
                    <Option value='3'>已过期</Option>
                    <Option value='4'>暂停中</Option>
                    <Option value='0'>异常</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
              <FormItem {...formItemLayout} label='发布者'>
                {getFieldDecorator('adZoneser', {
                  initialValue: ''
                })(<Input placeholder='发布者名称' />)}
              </FormItem>
            </Col>
            <Col xxl={6} xl={8} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='时间范围'>
                {getFieldDecorator('date_range', {
                  initialValue: ''
                })(
                  <RangePicker
                    showTime={{ format: 'HH:mm:ss' }}
                    format='YYYY/MM/DD HH:mm:ss'
                    // disabledDate={current => moment(current).isAfter(moment())}
                    ranges={{
                      本周至今: [moment().startOf('week'), moment()],
                      本月至今: [moment().startOf('month'), moment()],
                      全年至今: [moment().startOf('year'), moment()]
                    }}
                    getCalendarContainer={() => this._form_layout}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type='primary' htmlType='submit' icon='search' loading={isLoading}>
                查询
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={handleReset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

Filter.propTypes = {
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
}

export default Form.create()(Filter)
