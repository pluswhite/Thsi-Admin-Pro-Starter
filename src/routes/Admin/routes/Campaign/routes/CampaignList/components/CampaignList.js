import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'
import {
  Table,
  Icon,
  Card,
  Button,
  Switch,
  // Popconfirm,
  Modal,
  Input,
  message
} from 'antd'

import './CampaignList.scss'

const { TextArea } = Input

class CampaignList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    userList: PropTypes.array,
    fetchBannerList: PropTypes.func,
    fetchBannerAdsCode: PropTypes.func,
    changeBannerAdsStatus: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    // this.props.fetchBannerList()
  }

  onReloadList = () => {
    // this.props.fetchBannerList()
  }

  onNewClick = () => {
    browserHistory.push('/admin/campaign/new')
  }

  onStatusChange = (checked, data) => {
    // console.log(checked)
    this.props.changeBannerAdsStatus({
      guid: data.guid,
      operate: checked ? 'enable' : 'disable',
      role: data.role,
      rnd: (new Date()).getTime()
    }, () => {
      message.success('状态修改成功！')
    }, () => {
      message.error('抱歉，出错了。')
    })
  }

  showAdsCodeModal = (evt, data) => {
    // console.log(data)
    evt.preventDefault()
    this.props.fetchBannerAdsCode({
      guid: data.guid,
      role: data.role,
      rnd: (new Date()).getTime()
    }, (bannerAdsCode) => {
      // console.log(bannerAdsCode)
      Modal.info({
        title: '广告位代码：' + data.guid,
        content: (
          <div>
            <TextArea
              rows={10}
              readOnly
              value={bannerAdsCode}
              style={{
                marginTop: 15,
                resize: 'none'
              }} />
          </div>
        ),
        okText: '确定',
        width: 600,
        zIndex: 1060,
        maskClosable: true
      })
    }, () => {
      message.error('抱歉，出错了。')
    })
  }

  render () {
    const {
      isLoading,
      userList
    } = this.props

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <Link to={`/admin/adspace/banner/edit?guid=${text}`}>{text}</Link>,
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '额度总额',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '活动链接',
        dataIndex: 'link',
        key: 'link',
      },
      {
        title: '时间范围',
        dataIndex: 'dateRange',
        key: 'dateRange',
      },
      {
        title: '进度比例',
        dataIndex: 'progress',
        key: 'progress',
      },
      {
        title: '订单数量',
        dataIndex: 'sum',
        key: 'sum',
      },
      {
        title: '活动说明',
        dataIndex: 'introduction',
        key: 'introduction',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '最后修改时间',
        dataIndex: 'modified_data',
        key: 'modified_data',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        // fixed: 'right',
        width: 250,
        render: (text, record) => {
          const {
            guid,
            status
          } = record

          return (
            <span>
              <Switch
                size='small'
                defaultChecked={status === 'valid'}
                checkedChildren='开启'
                unCheckedChildren='关闭'
                onChange={(checked) => this.onStatusChange(checked, record)} />
              <span className='ant-divider' />
              <Link title='查看该广告位报表' to={`/admin/reports/total?guid=${guid}`}><i className='fa fa-files-o' /></Link>
              <span className='ant-divider' />
              <a title='获取广告位代码' onClick={(evt) => this.showAdsCodeModal(evt, record)}><i className='fa fa-code' /></a>
              <span className='ant-divider' />
              <Link title='编辑' to={`/admin/adspace/banner/edit?guid=${guid}`}><i className='fa fa-edit' /></Link>
              <span className='ant-divider' />
              {/* <Link title='广告位过滤设置' to={`/admin/adspace/banner/filter?guid=${guid}`}><i className='fa fa-ban' /></Link>
              <span className='ant-divider' /> */}
              <Link title='查看该广告位流量通路设置' to={`/admin/ssp/banner/edit?guid=${guid}`}><i className='fa fa-sliders' /></Link>
            </span>
          )
        }
      }
    ]

    const pagination = {
      size: 'small',
      showSizeChanger: true,
      pageSizeOptions: ['10', '30', '50', '100'],
      showQuickJumper: true
    }

    return (
      <div className='page-banner-list__wrapper'>
        <Helmet>
          <title>活动列表</title>
        </Helmet>
        <h2 className='page-title'>
          活动
          <small>列表</small>
        </h2>
        <div className='user-list-wrapper'>
          <Card
            title={<span><Icon type='bars' /> 列表</span>}
            extra={
              <div>
                <Button type='default' shape='circle' icon='reload' title='重新加载列表' onClick={this.onReloadList} />
                <Button type='default' icon='plus' title='新增活动' onClick={this.onNewClick}>新增活动</Button>
              </div>}
            bordered={false}
            noHovering >
            <Table
              columns={columns}
              dataSource={userList}
              pagination={pagination}
              loading={isLoading}
              bordered
              scroll={{ x: 1300 }}
              />
          </Card>
        </div>
      </div>
    )
  }
}

export default CampaignList
