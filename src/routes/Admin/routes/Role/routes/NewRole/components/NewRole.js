import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { browserHistory } from 'react-router'
import {
  Row,
  Col,
  Card,
  Icon,
  Form,
  Input,
  Button,
  Spin,
  message,
  Tree
} from 'antd'
// import {
//   requestUploadUrl
// } from 'vstore/auth'

// import './NewRole.scss'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

class NewRole extends Component {
  static propTypes = {
    form: PropTypes.object,
    isLoading: PropTypes.bool,
    roleInfo: PropTypes.object,
    updateRoleInfo: PropTypes.func,
    fetchRoleItem: PropTypes.func
  }

  constructor (props) {
    super(props)
    // const {
    //   permission
    // } = props.roleInfo.roleItem
    this.state = {
      checkedKeys: [],
      isPermissionEmapty: false,
      isFirst: false
    }
  }

  // componentWillReceiveProps = (nextProps) => {
  //   const {
  //     permission
  //   } = nextProps.roleInfo.roleItem
  //   // console.log(permission)
  //   if (this.state.isFirst) return
  //   this.setState({
  //     checkedKeys: permission
  //   })
  // }

  componentDidMount = () => {
    this.props.fetchRoleItem({
      guid: '',
      type: 'new',
      rnd: (new Date()).getTime()
    })
  }

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys,
      isPermissionEmapty: checkedKeys.length === 0
    })
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  handleSubmit = (evt) => {
    const {
      checkedKeys
    } = this.state
    evt.preventDefault()
    if (checkedKeys.length === 0) {
      this.setState({
        isPermissionEmapty: true
      })
      return
    }
    this.props.form.validateFields((err, values) => {
      // this.props.addNewRole(values)
      if (!err) {
        console.log('Received values of form: ', {
          type: 'new',
          role_permission: checkedKeys,
          ...values,
        })
        this.props.updateRoleInfo({
          type: 'new',
          role_permission: checkedKeys,
          ...values
        }, (msg) => {
          message.success(msg, 2, () => {
            browserHistory.push('/admin/role/list')
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
      roleInfo
    } = this.props

    const { getFieldDecorator } = form

    const {
      permissionList
    } = roleInfo

    const {
      checkedKeys,
      isPermissionEmapty
    } = this.state

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0
    //     },
    //     sm: {
    //       span: 14,
    //       offset: 6
    //     }
    //   }
    // }

    return (
      <div className='page-new-role__wrapper'>
        <Helmet>
          <title>新增角色</title>
        </Helmet>
        <Card
          title={<span><Icon type='plus' /> 新增角色</span>}
          extra={<Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/role/list')} />}
          bordered={false} >
          <Spin spinning={isLoading}>
            <Form layout='vertical' onSubmit={this.handleSubmit}>
              <fieldset>
                <Row gutter={24}>
                  <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label='角色名称'>
                      {getFieldDecorator('role_name', {
                        rules: [
                          {
                            required: true,
                            message: '请输入角色名称!'
                          }
                        ]
                      })(
                        <Input placeholder='角色名称' />
                      )}
                    </FormItem>
                  </Col>
                  <Col xxl={18} xl={16} lg={16} md={16} sm={12} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label='权限列表'
                      required
                      validateStatus={isPermissionEmapty ? 'error' : ''}
                      extra={isPermissionEmapty ? <div className='ant-form-explain'>权限类别不能为空!</div> : ''}>
                      <Tree
                        checkable
                        showLine
                        autoExpandParent
                        defaultExpandAll
                        onCheck={this.onCheck}
                        checkedKeys={checkedKeys}>
                        {this.renderTreeNodes(permissionList)}
                      </Tree>
                    </FormItem>
                  </Col>
                </Row>
              </fieldset>
              <fieldset>
                <legend />
                <FormItem style={{ textAlign: 'right' }}>
                  <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>提交</Button>
                  <Button onClick={() => browserHistory.push('/admin/role/list')}>返回</Button>
                </FormItem>
              </fieldset>
            </Form>
          </Spin>
        </Card>
      </div>
    )
  }
}

const NewRoleWrapper = Form.create()(NewRole)

export default NewRoleWrapper
