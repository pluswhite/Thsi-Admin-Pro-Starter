import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Select, Button } from 'antd'
import SearchUser from 'vcms/SearchUser'
import moment from 'moment'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  // labelCol: {
  //   span: 6
  // },
  wrapperCol: {
    span: 20
  }
}

class Filter extends Component {
  render () {
    const { form, isLoading, handleSearch, handleReset } = this.props
    const { getFieldDecorator } = form
    return (
      <div ref={el => (this._form_layout = el)}>
        <Form className='search-form' layout='vertical' onSubmit={handleSearch}>
          <Row gutter={24}>
            <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='ID编号'>
                {getFieldDecorator('user_id', {
                  initialValue: ''
                })(<Input placeholder='ID编号' />)}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='名称'>
                {getFieldDecorator('user_nickname', {
                  initialValue: undefined
                })(<SearchUser storageKey='user_list' />)}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='用户状态'>
                {getFieldDecorator('user_status', {
                  initialValue: ''
                })(
                  <Select placeholder='用户状态' getPopupContainer={() => this._form_layout}>
                    <Option value=''>全部</Option>
                    <Option value='1'>正常</Option>
                    <Option value='2'>停用</Option>
                    <Option value='0'>异常</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
              <FormItem {...formItemLayout} label='用户类型'>
                {getFieldDecorator('user_type', {
                  initialValue: ''
                })(
                  <Select placeholder='用户类型' getPopupContainer={() => this._form_layout}>
                    <Option value=''>全部</Option>
                    <Option value='1'>普通用户</Option>
                    <Option value='2'>微信运营</Option>
                    <Option value='0'>未知</Option>
                  </Select>
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
