import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'
import { Table, Icon, Card, Button, Switch, Popconfirm, message, Divider } from 'antd'
import { IS_PC } from 'vutils/Tools'
import './AccountList.scss'

class AccountList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    accountList: PropTypes.array,
    fetchAccount: PropTypes.func,
    resetAccountPassword: PropTypes.func,
    changeAccountStatus: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.fetchAccount()
  }

  onReloadList = () => {
    this.props.fetchAccount()
  }

  onNewClick = () => {
    browserHistory.push('/admin/account/new')
  }

  onRowClassName = (record, index) => {
    const { status } = record
    if (status === '0') {
      return 'row-disabled'
    }
    return ''
  }

  onStatusChange = (checked, data) => {
    // console.log(checked)
    this.props.changeAccountStatus(
      {
        id: data.id,
        operate: checked ? 'enable' : 'disable',
        // role: data.role,
        rnd: new Date().getTime()
      },
      msg => {
        message.success(msg)
      },
      msg => {
        message.error(msg)
      }
    )
  }

  onResetPassword = (evt, data) => {
    // console.log(checked)
    evt.preventDefault()
    this.props.resetAccountPassword(
      {
        id: data.id,
        rnd: new Date().getTime()
      },
      msg => {
        message.success(msg)
      },
      msg => {
        message.error(msg)
      }
    )
  }

  render () {
    const { isLoading, accountList } = this.props

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        fixed: IS_PC && 'left',
        width: 100,
        render: text => (
          <Link to={`/admin/account/edit?id=${text}`} title={text}>
            {text}
          </Link>
        )
      },
      {
        title: '名称',
        dataIndex: 'username',
        key: 'username',
        fixed: IS_PC && 'left',
        width: 160,
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '权限角色',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => {
          if (!text) {
            return <p title='未知'>未知</p>
          }
          return <p title={text}>{text}</p>
        }
      },
      {
        title: '最后修改时间',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '最后登录时间',
        dataIndex: 'last_login_time',
        key: 'last_login_time',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.last_login_time) - new Date(b.last_login_time),
        render: text => <p title={text}>{text || '0000-00-00 00:00:00'}</p>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: IS_PC ? 200 : 130,
        render: (text, record) => {
          const { id, status } = record

          return (
            <div>
              <Switch
                size='small'
                checked={status === '1'}
                checkedChildren='开启'
                unCheckedChildren='关闭'
                onChange={checked => this.onStatusChange(checked, record)}
              />
              <Divider type='vertical' />
              <Link title='编辑' to={`/admin/account/edit?id=${id}`}>
                <i className='fa fa-edit' />
              </Link>
              <Divider type='vertical' />
              <Popconfirm
                placement='leftBottom'
                ƒ
                title={<p className='text-danger'>确定要重置该账号的密码为默认值吗?</p>}
                onConfirm={evt => this.onResetPassword(evt, record, 'disable')}
                okText='确定'
                okType='danger'
                cancelText='取消'
              >
                <a title='重置密码' href='javascript:void(0)'>
                  <i className='fa fa-lock' />
                </a>
              </Popconfirm>
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
      <div className='page-account-list__wrapper'>
        <Helmet>
          <title>账号列表</title>
        </Helmet>
        {/* <h2 className='page-title'>
          账号
          <small>列表</small>
        </h2> */}
        <div className='account-list-wrapper'>
          <Card
            title={
              <span>
                <Icon type='bars' /> 列表
              </span>
            }
            extra={
              <div>
                <Button type='default' shape='circle' icon='reload' title='重新加载列表' onClick={this.onReloadList} />
                <Button type='default' icon='plus' title='新增账号' onClick={this.onNewClick}>
                  新增账号
                </Button>
              </div>
            }
            bordered={false}
          >
            <Table
              rowKey='id'
              size='middle'
              columns={columns}
              dataSource={accountList}
              pagination={pagination}
              loading={isLoading}
              rowClassName={this.onRowClassName}
              // scroll={{ x: 1100 }}
            />
          </Card>
        </div>
      </div>
    )
  }
}

export default AccountList
