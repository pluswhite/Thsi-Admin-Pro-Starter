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
    console.log(checked)
    this.props.siderVisibleChange()
  }

  render () {
    const {
      isLoading,
      siderVisible
    } = this.props

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }

    return (
      <div className='page-layout__wrapper'>
        <Helmet>
          <title>Settings</title>
        </Helmet>
        <h2 className='page-title'>Settings</h2>
        <div className='settings-wrapper'>
          <Card
            title={<span><Icon type='setting' /> Settings</span>}
            noHovering
            bordered={false}>
            <Row>
              <Col xs={2} md={8} />
              <Col xs={20} md={8}>
                <Form>
                  <FormItem
                    {...formItemLayout}
                    label='Sider Menu'
                  >
                    <Switch
                      defaultChecked={siderVisible}
                      onChange={this.onChange}
                      checkedChildren='Show'
                      unCheckedChildren='Hide' />
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
