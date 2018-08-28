import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Icon, Table, Card, Button } from 'antd'
import TablePie from '../../../components/TablePie'
import './index.scss'
// import ReportFilter from './ReportFilter'
import moment from 'moment'
import { IS_PC } from 'vutils/Tools'

const renderColumns = (type, reportData) => {
  let render_type = 1
  if (reportData && typeof reportData.order_type === 'string') {
    render_type = 2
  }
  let columns = []
  let first_column = {
    title: '',
    key: 'all',
    render: () => '总计'
  }
  const EMPTYTIP = <div style={{ textAlign: 'center' }}>/</div>
  if (render_type === 1) {
    // 总数据
    columns = [
      {
        title: '订单(数量/金额)',
        dataIndex: 'order',
        key: 'order',
        render: data => {
          let data_new = data
          if (data instanceof Array) {
            data_new = data.slice()
            data_new.length > 1 && (data_new[1] = `￥${data_new[1]}`)
            data_new = data_new.join(' / ')
          }
          return data_new
        }
      },
      {
        title: '订单类型',
        dataIndex: 'order_type',
        key: 'order_type',
        render: data => ((data && data.length) ? <TablePie data={data} title='订单类型' /> : EMPTYTIP)
      },
      {
        title: '订单地域(TOP5)',
        dataIndex: 'region',
        key: 'region',
        render: data => ((data && data.length) ? <TablePie data={data} title='订单地域' /> : EMPTYTIP)
      },
      {
        title: '热门订单商品分类(TOP5)',
        dataIndex: 'hot_category',
        key: 'hot_category',
        render: data => ((data && data.length) ? <TablePie data={data} title='热门分类' /> : EMPTYTIP)
      },
      // {
      //   title: '返利(返现/返券)',
      //   dataIndex: 'rebate',
      //   key: 'rebate',
      //   render: data => {
      //     let data_new = data
      //     if (data instanceof Array) {
      //       data_new = data.slice()
      //       data_new.map((item, idx) => {
      //         data_new[idx] = `￥${item}`
      //       })
      //       data_new = data_new.join(' / ')
      //     }
      //     return data_new
      //   }
      // }
      {
        title: '返现',
        dataIndex: 'rebate',
        key: 'rebate',
        render: data => {
          let data_new = '/'
          if (data instanceof Array) {
            data_new = `￥${data[0]}`
          }
          return data_new
        }
      }
    ]
    if (type === 'list') {
      first_column = {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        fixed: true,
        width: IS_PC ? 150 : 100
      }
    }
  } else {
    // 用户数据
    columns = [
      {
        title: '订单类型',
        dataIndex: 'order_type',
        key: 'order_type'
      },
      {
        title: '订单(数量/金额)',
        dataIndex: 'order',
        key: 'order',
        render: data => {
          let data_new = data
          if (data instanceof Array) {
            data_new = data.slice()
            data_new.length > 1 && (data_new[1] = `￥${data_new[1]}`)
            data_new = data_new.join(' / ')
          }
          return data_new
        }
      },
      {
        title: '订单地域(TOP5)',
        dataIndex: 'region',
        key: 'region',
        render: data => ((data && data.length) ? <TablePie data={data} title='订单地域' /> : EMPTYTIP)
      },
      {
        title: '热门订单商品分类(TOP5)',
        dataIndex: 'hot_category',
        key: 'hot_category',
        render: data => ((data && data.length) ? <TablePie data={data} title='热门分类' /> : EMPTYTIP)
      },
      // {
      //   title: '返利(返现/返券)',
      //   dataIndex: 'rebate',
      //   key: 'rebate',
      //   render: data => {
      //     let data_new = data
      //     if (data instanceof Array) {
      //       data_new = data.slice()
      //       data_new.map((item, idx) => {
      //         data_new[idx] = `￥${item}`
      //       })
      //       data_new = data_new.join(' / ')
      //     }
      //     return data_new
      //   }
      // }
      {
        title: '返现',
        dataIndex: 'rebate',
        key: 'rebate',
        render: data => {
          let data_new = '/'
          if (data instanceof Array) {
            data_new = `￥${data[0]}`
          }
          return data_new
        }
      }
    ]
    if (type === 'list') {
      first_column = {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        fixed: true,
        width: IS_PC ? 150 : 100
      }
    }
  }
  columns.unshift(first_column)
  return columns
}
const pageSizeOptions = ['10', '30', '50', '100']
const paginationOptions = {
  size: 'small',
  showSizeChanger: true,
  pageSizeOptions,
  showQuickJumper: true,
  showTotal: total => {
    return `总数 ${total} 项`
  }
}
class CampaignReport extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    // fetchReport: PropTypes.func.isRequired,
    // regionList: PropTypes.array.isRequired,
    // getProvinceList: PropTypes.func.isRequired,
    // getCityList: PropTypes.func.isRequired,
    // reportList: PropTypes.array.isRequired,
    // reportTotal: PropTypes.array.isRequired,
    // getCampaignType: PropTypes.func.isRequired,
    // orderTypeList: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      pagination: {
        current: 1,
        pageSize: parseInt(pageSizeOptions[0], 10)
      }
    }
    // 渲染类型分 all, all-date, user, user-date
    this.render_type = 1
  }

  componentDidMount () {
  }

  render () {
    // const { isLoading, regionList, reportTotal, reportList, getCityList, orderTypeList } = this.props
    // const { pagination } = this.state

    return (
      <div className='reports-wrapper'>
        <Helmet>
          <title>订单报表</title>
        </Helmet>
        {/* <h2 className='page-title'>投放报表</h2> */}
        <div className='report-wrapper campaign-report'></div>
      </div>
    )
  }
}

export default CampaignReport
