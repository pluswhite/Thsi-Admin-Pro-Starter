import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, DatePicker, Button, Select } from 'antd'
import moment from 'moment'
moment.locale('zh-cn')

const Option = Select.Option
const FormItem = Form.Item
const formItemLayout = {
  // labelCol: { span: 10, offset: 2 },
  wrapperCol: { span: 20 }
}

class Filter extends Component {
  render() {
    const { form, isLoading, handleFormSubmit, handleReset, activityTypeList } = this.props
    const { getFieldDecorator } = form
    return (
      <div ref={el => (this._form_layout = el)}>
        <Form onSubmit={handleFormSubmit} layout='vertical'>
          <Row gutter={24}>
            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
              <FormItem label='活动名称' {...formItemLayout}>
                {getFieldDecorator('keyWords', {
                  initialValue: ''
                })(<Input className='search' placeholder='请输入活动名称' />)}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='活动类型'>
                {getFieldDecorator('type', {
                  initialValue: ''
                })(
                  <Select placeholder='活动类型' getPopupContainer={() => this._form_layout}>
                    <Option value=''>全部</Option>
                    {activityTypeList.map(item => (
                      <Option key={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='活动状态'>
                {getFieldDecorator('status', {
                  initialValue: ''
                })(
                  <Select placeholder='请选择活动状态' getPopupContainer={() => this._form_layout}>
                    <Option value=''>全部</Option>
                    <Option value='1'>未开始</Option>
                    <Option value='2'>执行中</Option>
                    <Option value='3'>已结束</Option>
                    <Option value='4'>暂停中</Option>
                    <Option value='0'>异常</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
              <FormItem label='活动时间' {...formItemLayout}>
                {getFieldDecorator('updated', {
                  initialValue: ''
                })(
                  <DatePicker.RangePicker
                    // placeholder='请选则活动修改时间范围'
                    showTime={{ format: 'HH:mm' }}
                    style={{
                      width: '100%'
                    }}
                    format='YYYY-MM-DD HH:mm'
                    // disabledDate={current => moment(current).isAfter(moment())}
                    ranges={{
                      今天: [moment().startOf('day'), moment()],
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
          <Row style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit' title='查询' icon='search' loading={isLoading}>
              查询
            </Button>
            <Button type='default' htmlType='reset' title='重置' style={{ marginLeft: 10 }} onClick={handleReset}>
              重置
            </Button>
          </Row>
        </Form>
      </div>
    )
  }
}

Filter.propTypes = {
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
}

export default Form.create()(Filter)
