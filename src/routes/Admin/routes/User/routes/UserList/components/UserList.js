import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'
import { Table, Icon, Card, Button, Switch, Popconfirm, message, Avatar, Tag, Divider, Popover } from 'antd'
import Filter from './Filter'
import './UserList.scss'
import { IS_PC } from 'vutils/Tools'

const pageSizeOptions = ['30', '50', '100']

const paginationOptions = {
  size: 'small',
  showSizeChanger: true,
  pageSizeOptions,
  showQuickJumper: true,
  showTotal: total => {
    return `总数 ${total} 项`
  }
}

class UserList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    userList: PropTypes.array,
    fetchUserList: PropTypes.func,
    changeUserStatus: PropTypes.func,
    changeUserType: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        current: 1,
        pageSize: parseInt(pageSizeOptions[0], 10)
      }
    }
  }

  componentDidMount = () => {
    this.requestDataList()
  }

  requestDataList = (params = {}) => {
    this._filter.props.form.validateFields((err, values) => {
      if (!err) {
        const { pagination } = this.state
        // console.log('Received values of form: ', {
        //   ...values,
        //   // ...pagination,
        //   current: 1,
        //   pageSize: pagination.pageSize,
        //   ...params
        // })
        this.props.fetchUserList(
          {
            ...values,
            current: 1,
            pageSize: pagination.pageSize,
            ...params
          },
          data => {
            // console.log(data)
            const { pagination } = this.state
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = data.total
            pagination.current = data.current
            pagination.pageSize = data.pageSize
            this.setState({
              pagination
            })
          },
          msg => {
            message.error(msg)
            console.log('Error')
          }
        )
      }
    })
  }

  handleSearch = evt => {
    evt.preventDefault()
    this.requestDataList()
  }

  handleReset = evt => {
    evt.preventDefault()
    this._filter.props.form.resetFields()
  }

  onReloadList = () => {
    this.requestDataList()
  }

  onNewClick = () => {
    browserHistory.push('/admin/user/new')
  }

  onSetWechatOpConfirm = (evt, data, op) => {
    this.props.changeUserType(
      {
        id: data.id,
        operate: op,
        rnd: new Date().getTime()
      },
      () => {
        message.success('设置成功！')
      },
      () => {
        message.error('抱歉，出错了。')
      }
    )
  }

  onStatusChange = (checked, data) => {
    // console.log(checked)
    this.props.changeUserStatus(
      {
        id: data.id,
        operate: checked ? 'enable' : 'disable',
        rnd: new Date().getTime()
      },
      () => {
        message.success('状态修改成功！')
      },
      () => {
        message.error('抱歉，出错了。')
      }
    )
  }

  handleTableChange = (pagination, filters, sorter) => {
    // console.log(pagination)
    // console.log(filters)
    this.requestDataList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }

  render() {
    const { isLoading, userList } = this.props

    const { pagination } = this.state
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        fixed: IS_PC && 'left',
        width: 80,
        sorter: (a, b) => a.id - b.id,
        render: text => (
          <Link to={`/admin/user/edit?id=${text}`} title={text}>
            {text}
          </Link>
        )
      },
      {
        title: '用户名称',
        dataIndex: 'nickname',
        key: 'nickname',
        fixed: IS_PC && 'left',
        width: 200,
        sorter: (a, b) => a.nickname.length - b.nickname.length,
        render: (text, record) => {
          let sexTxt = '未知'
          if (record.sex === '1') {
            sexTxt = '男'
          } else {
            sexTxt = '女'
          }
          const content = (
            <div>
              <p>手机号码：{record.phone}</p>
              <p>性别：{sexTxt}</p>
              <p>国家省市：{record.country} {record.location}</p>
            </div>
          )

          return (
            <Popover content={content} title={text} placement='topLeft' trigger='hover'>
              <p title={text}>
                <Avatar src={record.avatar} style={{ marginRight: 7 }} />
                {text}
                <Icon type='idcard' style={{
                  color: '#1890ff',
                  marginLeft: 5
                }} />
              </p>
            </Popover>
          )
        }
      },
      // {
      //   title: '手机号码',
      //   dataIndex: 'phone',
      //   key: 'phone',
      //   render: text => <p title={text}>{text}</p>
      // },
      // {
      //   title: '性别',
      //   dataIndex: 'sex',
      //   key: 'sex',
      //   sorter: (a, b) => parseInt(a.sex, 10) - parseInt(b.sex, 10),
      //   render: text => {
      //     let sexTxt = '未知'
      //     if (text === '1') {
      //       sexTxt = '男'
      //     } else {
      //       sexTxt = '女'
      //     }

      //     return sexTxt
      //   }
      // },
      // {
      //   title: '省市',
      //   dataIndex: 'location',
      //   key: 'location'
      // },
      // {
      //   title: '国家',
      //   dataIndex: 'country',
      //   key: 'country'
      // },
      {
        title: '用户资产',
        key: 'assets',
        render: (text, record) => (
          <Link to={`/admin/user/assets?id=${record.id}`}>查看</Link>
        )
      },
      {
        title: '最后修改时间',
        dataIndex: 'last_modified_at',
        key: 'last_modified_at',
        sorter: (a, b) => new Date(a.last_modified_at) - new Date(b.last_modified_at),
        // fixed: IS_PC && 'right',
        // width: 180,
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '最近登录时间',
        dataIndex: 'last_login_at',
        key: 'last_login_at',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.last_login_at) - new Date(b.last_login_at),
        // fixed: IS_PC && 'right',
        // width: 180,
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '用户类型',
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => parseInt(a.type, 10) - parseInt(b.type, 10),
        // fixed: IS_PC && 'right',
        // width: 120,
        render: text => {
          let isWechatOpTxt = '未知'
          if (text === '2') {
            isWechatOpTxt = <Tag color='#f50'>微信运营</Tag>
          } else if (text === '1') {
            isWechatOpTxt = '普通用户'
          }

          return <div>{isWechatOpTxt}</div>
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: IS_PC ? 160 : 130,
        render: (text, record) => {
          const { status, type } = record

          let setWechatOpConfirm = (
            <Popconfirm
              placement='leftBottom'
              title={<p>确定要设置该用户为微信运营吗?</p>}
              onConfirm={evt => this.onSetWechatOpConfirm(evt, record, 'enable')}
              okText='确定'
              okType='primary'
              cancelText='取消'
            >
              <a title='设置为微信运营' href='javascript:void(0)'>
                <i className='fa fa-share-alt' />
              </a>
            </Popconfirm>
          )

          if (type === '2') {
            setWechatOpConfirm = (
              <Popconfirm
                placement='leftBottom'
                title={<p className='text-danger'>确定要恢复该用户为普通用户吗?</p>}
                onConfirm={evt => this.onSetWechatOpConfirm(evt, record, 'disable')}
                okText='确定'
                okType='danger'
                cancelText='取消'
              >
                <a title='设置为普通用户' href='javascript:void(0)'>
                  <i className='fa fa-share-alt-square' />
                </a>
              </Popconfirm>
            )
          }

          return (
            <div>
              <Switch
                size='small'
                checked={status === '1'}
                checkedChildren='启用'
                unCheckedChildren='停用'
                onChange={checked => this.onStatusChange(checked, record)}
              />
              <Divider type='vertical' />
              <Link title='编辑' to={`/admin/user/edit?id=${record.id}`}>
                <i className='fa fa-edit' />
              </Link>
              <Divider type='vertical' />
              {setWechatOpConfirm}
            </div>
          )
        }
      }
    ]

    return (
      <div className='page-user-list__wrapper'>
        <Helmet>
          <title>用户列表</title>
        </Helmet>
        {/* <h2 className='page-title'>
          用户
          <small>列表</small>
        </h2> */}
        <div className='user-list-wrapper'>
          <div className='search-filter-wrapper'>
            <Card
              title={
                <span>
                  <Icon type='filter' /> 筛选
                </span>
              }
              bordered={false}
            >
              <Filter
                wrappedComponentRef={el => {
                  this._filter = el
                }}
                isLoading={isLoading}
                handleSearch={this.handleSearch}
                handleReset={this.handleReset}
              />
            </Card>
          </div>
          <div className='data-result-list'>
            <Card
              title={
                <span>
                  <Icon type='bars' /> 列表
                </span>
              }
              extra={
                <div>
                  <Button type='default' icon='reload' shape='circle' title='刷新' onClick={this.onReloadList} />
                  {/* <Button type='default' icon='plus' title='新增用户' onClick={this.onNewClick}>新增用户</Button> */}
                </div>
              }
              bordered={false}
            >
              <Table
                rowKey='id'
                size='middle'
                columns={columns}
                dataSource={userList}
                pagination={{
                  ...paginationOptions,
                  ...pagination
                }}
                loading={isLoading}
                onChange={this.handleTableChange}
                scroll={{ x: '100%' }}
              />
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedUserListForm = UserList

export default WrappedUserListForm
