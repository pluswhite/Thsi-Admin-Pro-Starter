import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  Row,
  Col,
  Card,
  Icon,
  Form,
  Switch
} from 'antd'

import './Settings.scss'

const FormItem = Form.Item

class Settings extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    siderVisible: PropTypes.bool,
    siderVisibleChange: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    // this.props.fetchSettings()
  }

  onChange = (checked) => {
    // console.log(checked)
    this.props.siderVisibleChange()
  }

  render () {
    const {
      siderVisible
    } = this.props

    const formItemLayout = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 14
      }
    }

    return (
      <div className='page-layout__wrapper'>
        <Helmet>
          <title>系统设置</title>
        </Helmet>
        <h2 className='page-title'>
          设置
        </h2>
        <div className='settings-wrapper'>
          <Card
            title={<span><Icon type='setting' /> 设置列表</span>}
            bordered={false}>
            <Row>
              <Col xs={2} md={8} />
              <Col xs={20} md={8}>
                <Form>
                  <FormItem
                    {...formItemLayout}
                    label='侧边栏收缩是否可见'
                  >
                    <Switch
                      defaultChecked={siderVisible}
                      onChange={this.onChange}
                      checkedChildren='可见'
                      unCheckedChildren='隐藏' />
                  </FormItem>
                </Form>
              </Col>
              <Col xs={2} md={8} />
            </Row>
          </Card>
        </div>
      </div>
    )
  }
}

export default Settings
