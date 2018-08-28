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
  Spin,
  message,
  Tree
} from 'antd'
// import {
//   requestUploadUrl
// } from 'vstore/auth'

// import './EditRole.scss'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

class EditRole extends Component {
  static propTypes = {
    form: PropTypes.object,
    isLoading: PropTypes.bool,
    guid: PropTypes.string,
    roleInfo: PropTypes.object,
    updateRoleInfo: PropTypes.func,
    fetchRoleItem: PropTypes.func,
    resetRoleInfo: PropTypes.func
  }

  constructor (props) {
    super(props)
    const {
      permission
    } = props.roleInfo.roleItem
    this.state = {
      guid: props.guid,
      checkedKeys: permission,
      isPermissionEmapty: false,
      isFirst: 0
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      name,
      permission
    } = nextProps.roleInfo.roleItem
    // console.log(permission)
    if (this.state.isFirst > 1) return
    this.setState({
      roleName: name,
      checkedKeys: permission,
      isFirst: this.state.isFirst + 1
    })
  }

  componentDidMount = () => {
    this.fetchRole()
  }

  componentWillUnmount = () => {
    this.props.resetRoleInfo()
  }

  fetchRole = () => {
    let {
      guid
    } = this.state
    guid && store.set('edit_role_id', guid)
    guid = guid || store.get('edit_role_id')
    this.props.fetchRoleItem({
      id: guid,
      type: 'edit',
      rnd: (new Date()).getTime()
    })
    this.setState({
      guid
    })
  }

  onCheck = (checkedKeys) => {
    console.log(checkedKeys)
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
      guid,
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
      // this.props.addEditRole(values)
      if (!err) {
        console.log({
          type: 'edit',
          role_permission: checkedKeys,
          ...values,
        })
        // console.log(values)
        // console.log(checkedKeys)
        this.props.updateRoleInfo({
          id: guid,
          type: 'edit',
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
      name
    } = roleInfo.roleItem

    const {
      checkedKeys,
      isPermissionEmapty
    } = this.state

    const formItemLayout = {
      wrapperCol: {
        span: 20
      }
    }

    // console.log(checkedKeys)

    return (
      <div className='page-edit-role__wrapper'>
        <Helmet>
          <title>编辑角色</title>
        </Helmet>
        <h2 className='page-title'>
          角色
          <small>编辑</small>
        </h2>
        <Card
          title={<span><Icon type='edit' /> 编辑角色</span>}
          extra={<div>
            <Button type='default' shape='circle' icon='reload' title='刷新' onClick={this.fetchRole} />
            <Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/role/list')} />
          </div>}
          bordered={false}>
          <Spin spinning={isLoading}>
            <Form layout='vertical' onSubmit={this.handleSubmit}>
              <fieldset>
                <Row gutter={24}>
                  <Col xxl={6} xl={8} lg={8} md={8} sm={12} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label='角色名称'>
                      {getFieldDecorator('role_name', {
                        initialValue: name,
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
                      extra={isPermissionEmapty ? <div className='ant-form-explain'>权限类别不能为空!</div> : ''}
                      >
                      <Tree
                        checkable
                        showLine
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

const EditRoleWrapper = Form.create()(EditRole)

export default EditRoleWrapper
