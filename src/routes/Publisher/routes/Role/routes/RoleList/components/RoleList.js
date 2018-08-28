import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'
import {
  Table,
  Icon,
  Card,
  Button,
  // Switch,
  // Popconfirm,
  Modal,
  message,
  Tree
} from 'antd'
import { IS_PC } from 'vutils/Tools'
import './RoleList.scss'

const TreeNode = Tree.TreeNode

class RoleList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    roleList: PropTypes.array,
    fetchRole: PropTypes.func,
    fetchRolePermissions: PropTypes.func
    // changeRoleStatus: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.fetchRole()
  }

  onReloadList = () => {
    this.props.fetchRole()
  }

  onNewClick = () => {
    browserHistory.push('/admin/role/new')
  }

  // onStatusChange = (checked, data) => {
  //   // console.log(checked)
  //   this.props.changeRoleStatus({
  //     id: data.id,
  //     operate: checked ? 'enable' : 'disable',
  //     // role: data.role,
  //     rnd: (new Date()).getTime()
  //   }, () => {
  //     message.success('状态修改成功！')
  //   }, () => {
  //     message.error('抱歉，出错了。')
  //   })
  // }

  renderTreeNodes = data => {
    return data.map(item => {
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

  showPermissionModal = (evt, data) => {
    // console.log(data)
    evt.preventDefault()
    this.props.fetchRolePermissions(
      {
        id: data.id,
        role: data.role,
        rnd: new Date().getTime()
      },
      permissionInfo => {
        // console.log(permissionInfo)
        const { permissionList } = permissionInfo
        Modal.info({
          title: '权限列表：' + data.role,
          content: (
            <Tree showLine autoExpandParent defaultExpandAll>
              {this.renderTreeNodes(permissionList)}
            </Tree>
          ),
          okText: '关闭',
          width: 600,
          zIndex: 1060,
          maskClosable: true
        })
      },
      () => {
        message.error('抱歉，出错了。')
      }
    )
  }

  render () {
    const { isLoading, roleList } = this.props

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        fixed: IS_PC && 'left',
        width: 100,
        render: text => (
          <Link to={`/admin/role/edit?id=${text}`} title={text}>
            {text}
          </Link>
        )
      },
      {
        title: '角色名称',
        dataIndex: 'role',
        key: 'role',
        fixed: IS_PC && 'left',
        width: 200,
        render: (text, record) => {
          if (!text) {
            return <p title='未知'>未知</p>
          }
          return <p title={text}>{text}</p>
        }
      },
      {
        title: '权限列表',
        dataIndex: 'permission_list',
        key: 'permission_list',
        render: (text, record) => (
          <a title='查看权限详情' onClick={evt => this.showPermissionModal(evt, record)} className='permisson-list'>
            详情
          </a>
        )
      },
      {
        title: '最后修改时间',
        dataIndex: 'created_at',
        key: 'created_at',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: IS_PC ? 100 : 50,
        render: (text, record) => {
          const { id } = record

          return (
            <div>
              {/* <Switch
                size='small'
                checked={status === '1'}
                checkedChildren='开启'
                unCheckedChildren='关闭'
                onChange={(checked) => this.onStatusChange(checked, record)} />
              <span className='ant-divider' /> */}
              <Link title='编辑' to={`/admin/role/edit?id=${id}`}>
                <i className='fa fa-edit' />
              </Link>
            </div>
          )
        }
      }
    ]

    const pagination = {
      size: 'small',
      showSizeChanger: true,
      pageSizeOptions: ['10', '30', '50', '100'],
      showQuickJumper: true,
      showTotal: total => {
        return `总数 ${total} 项`
      }
    }

    return (
      <div className='page-role-list__wrapper'>
        <Helmet>
          <title>角色列表</title>
        </Helmet>
        <h2 className='page-title'>
          角色
          <small>列表</small>
        </h2>
        <div className='role-list-wrapper'>
          <Card
            title={
              <span>
                <Icon type='bars' /> 列表
              </span>
            }
            extra={
              <div>
                <Button type='default' shape='circle' icon='reload' title='重新加载列表' onClick={this.onReloadList} />
                <Button type='default' icon='plus' title='新增角色' onClick={this.onNewClick}>
                  新增角色
                </Button>
              </div>
            }
            bordered={false}
          >
            <Table
              rowKey='id'
              size='middle'
              columns={columns}
              dataSource={roleList}
              pagination={pagination}
              loading={isLoading}
              scroll={{ x: 1100 }}
            />
          </Card>
        </div>
      </div>
    )
  }
}

export default RoleList
