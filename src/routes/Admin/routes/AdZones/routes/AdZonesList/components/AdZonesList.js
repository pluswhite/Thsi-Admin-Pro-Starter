import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'
import { Table, Icon, Card, Button, Popconfirm, message, Divider, Tag, Modal, Tooltip } from 'antd'
import Filter from './Filter'
import { IS_PC } from 'vutils/Tools'
import './AdZonesList.scss'

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

class AdZonesList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    adZonesList: PropTypes.array,
    fetchAdZonesList: PropTypes.func,
    fetchAdZonesBindInfos: PropTypes.func,
    changeAdZonesStatus: PropTypes.func
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
    // this.requestDataList()
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
    browserHistory.push('/admin/adZones/new')
  }

  onSetAdZonesStatusConfirm = (evt, data, op) => {
    this.props.changeAdZonesStatus(
      {
        id: data.id,
        operate: op,
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

  showAdZonesBindInfosModal = (evt, data) => {
    // console.log(data)
    const { user_list_type } = data
    evt.preventDefault()
    this.props.fetchAdZonesBindInfos(
      {
        id: data.id,
        rnd: new Date().getTime()
      },
      adZonesBindInfos => {
        // console.log(tagsAndUsersList)
        const { tagsList, usersList, goodsList } = adZonesBindInfos

        let statusTxt = '异常'
        if (user_list_type === '1') {
          statusTxt = '白名单'
        } else if (user_list_type === '2') {
          statusTxt = <Tag color='#000'>黑名单</Tag>
        }

        Modal.info({
          title: '发布名称：' + data.adZones_name,
          content: (
            <div className='tags-and-users-wrapper'>
              <div className='bind-list'>
                <div>{statusTxt}</div>
              </div>
              <div className='bind-list'>
                <h4>标签列表</h4>
                {tagsList.map(item => (
                  <Tag color='#87d068' key={item.key}>
                    {item.label}
                  </Tag>
                ))}
                {tagsList.length === 0 && (
                  <span>（空）</span>
                )}
              </div>
              <div className='bind-list'>
                <h4>用户列表</h4>
                {usersList.map(item => {
                  if (item.label === '') {
                    return (
                      <Tag color='#2db7f5' key={item.key}>
                        {item.key}
                      </Tag>
                    )
                  }
                  return (
                    <Tag color='#2db7f5' key={item.key}>
                      {item.label}
                    </Tag>
                  )
                })}
                {usersList.length === 0 && (
                  <span>（空）</span>
                )}
              </div>
              <div className='bind-list'>
                <h4>商品列表</h4>
                {goodsList.map(item => (
                  <Tag color='#f50' key={item.key}>
                    {item.label}
                  </Tag>
                ))}
                {goodsList.length === 0 && (
                  <span>（空）</span>
                )}
              </div>
            </div>
          ),
          okText: '关闭',
          width: 800,
          zIndex: 1060,
          maskClosable: true
        })
      },
      () => {
        message.error('抱歉，出错了。')
      }
    )
  }

  onStatusChange = (checked, data) => {
    // console.log(checked)
    this.props.changeAdZonesStatus(
      {
        id: data.id,
        operate: checked ? 'enable' : 'disable',
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
    const { isLoading, adZonesList } = this.props

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
          <Link to={`/admin/adZones/edit?id=${text}`} title={text}>
            {text}
          </Link>
        )
      },
      {
        title: '发布名称',
        dataIndex: 'adZones_name',
        key: 'adZones_name',
        fixed: IS_PC && 'left',
        width: 250,
        sorter: (a, b) => a.adZones_name.length - b.adZones_name.length,
        render: (text, record) => {
          return (
            <p title={text}>
              <Tooltip placement='top' title='查看发布详情'>
                <a href='#' onClick={evt => this.showAdZonesBindInfosModal(evt, record)}>
                  {text}
                  <i
                    className='fa fa-info-circle'
                    style={{
                      paddingLeft: 5
                    }}
                  />
                </a>
              </Tooltip>
            </p>
          )
        }
      },
      {
        title: '启用时间范围',
        dataIndex: 'date_range',
        key: 'date_range',
        fixed: IS_PC && 'left',
        width: 150,
        sorter: (a, b) => {
          let aEndDate = a.toString().split('~')[1]
          let bEndDate = b.toString().split('~')[1]
          return new Date(aEndDate) - new Date(bEndDate)
        },
        render: text => {
          let dataArr = text.split('~')
          return (
            <div title={text}>
              {/* {dataArr[0]} ~
              {dataArr[1]} */}
              <p>{dataArr[0]} ~</p>
              <p>{dataArr[1]}</p>
            </div>
          )
        }
      },
      {
        title: '推送用户数量',
        dataIndex: 'user_count',
        key: 'user_count',
        sorter: (a, b) => a.user_count - b.user_count,
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '推送商品数量',
        dataIndex: 'goods_count',
        key: 'goods_count',
        sorter: (a, b) => a.goods_count - b.goods_count,
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '发布者',
        dataIndex: 'adZoneser',
        key: 'adZoneser',
        width: 100,
        sorter: (a, b) => a.adZoneser.length - b.adZoneser.length,
        render: text => <p title={text}>{text}</p>
      },
      {
        title: '用户名单类型',
        dataIndex: 'user_list_type',
        key: 'user_list_type',
        fixed: IS_PC && 'right',
        width: 130,
        sorter: (a, b) => a.user_list_type - b.user_list_type,
        render: (text, record) => {
          let statusTxt = '异常'
          if (text === '1') {
            statusTxt = '白名单'
          } else if (text === '2') {
            statusTxt = <Tag color='#000'>黑名单</Tag>
          }

          return <div>{statusTxt}</div>
        }
      },
      {
        title: '发布状态',
        dataIndex: 'status',
        fixed: IS_PC && 'right',
        width: 120,
        key: 'status',
        sorter: (a, b) => a.adZones_status - b.adZones_status,
        render: (text, record) => {
          let statusTxt = '异常'
          if (text === '1') {
            statusTxt = '未开始'
          } else if (text === '2') {
            statusTxt = '执行中'
          } else if (text === '3') {
            statusTxt = '已过期'
          } else if (text === '4') {
            statusTxt = '暂停中'
          }

          return <p title={statusTxt}>{statusTxt}</p>
        }
      },
      {
        title: '最后修改时间',
        dataIndex: 'last_modified_at',
        key: 'last_modified_at',
        defaultSortOrder: 'descend',
        fixed: IS_PC && 'right',
        width: 150,
        sorter: (a, b) => new Date(a.last_modified_at) - new Date(b.last_modified_at),
        render: text => <p title={text}>{text}</p>
      },
      // {
      //   title: '操作',
      //   dataIndex: 'action',
      //   key: 'action',
      //   fixed: 'right',
      //   width: IS_PC ? 100 : 50,
      //   render: (text, record) => {
      //     const { status } = record

      //     let setAdZonesStatusConfirm = null

      //     if (status === '1' || status === '2') {
      //       setAdZonesStatusConfirm = (
      //         <Popconfirm
      //           placement='leftBottom'
      //           ƒ
      //           title={<p className='text-danger'>确定要停用该发布吗?</p>}
      //           onConfirm={evt => this.onSetAdZonesStatusConfirm(evt, record, 'disable')}
      //           okText='确定'
      //           okType='danger'
      //           cancelText='取消'
      //         >
      //           <a title='停用发布' href='javascript:void(0)'>
      //             <i className='fa fa-toggle-on' />
      //           </a>
      //         </Popconfirm>
      //       )
      //     } else if (status === '4') {
      //       setAdZonesStatusConfirm = (
      //         <Popconfirm
      //           placement='leftBottom'
      //           ƒ
      //           title={<p>确定要启用该发布吗?</p>}
      //           onConfirm={evt => this.onSetAdZonesStatusConfirm(evt, record, 'enable')}
      //           okText='确定'
      //           okType='primary'
      //           cancelText='取消'
      //         >
      //           <a title='启用发布' href='javascript:void(0)'>
      //             <i className='fa fa-toggle-off' />
      //           </a>
      //         </Popconfirm>
      //       )
      //     }

      //     return (
      //       <div>
      //         <Link title='编辑' to={`/admin/adZones/edit?id=${record.id}`}>
      //           <i className='fa fa-edit' />
      //         </Link>
      //         {setAdZonesStatusConfirm !== null && <Divider type='vertical' />}
      //         {setAdZonesStatusConfirm}
      //       </div>
      //     )
      //   }
      // }
    ]

    return (
      <div className='page-adZones-list__wrapper'>
        <Helmet>
          <title>发布列表</title>
        </Helmet>
        {/* <h2 className='page-title'>
          发布
          <small>列表</small>
        </h2> */}
        <div className='adZones-list-wrapper'>
        </div>
      </div>
    )
  }
}
export default AdZonesList
