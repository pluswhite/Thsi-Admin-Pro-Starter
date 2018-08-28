import React from 'react'
import PropTypes from 'prop-types'
import ChartWrapper from '../ChartWrapper'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { Table, message } from 'antd'
import { parseNumber } from '../parseNumber'
import { IS_PC } from 'vutils/Tools'
const paginationOptions = {
  size: 'small',
  showQuickJumper: true
  // showTotal: total => {
  //   return `总数 ${total} 项`
  // }
}

const customize = idx => {
  return {
    areaStyle: {
      color: '#d0e9ff'
    },
    showSymbol: false
  }
}

class SSComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pagination: {
        current: 1
      },
      isLoading: false
    }
    this.typeTextList = (() => {
      if (props.target.title === '热门搜索') {
        return '搜索用户数'
      }
      return '分享用户数'
    })()
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { target, handleFetch } = this.props
    this.setState({
      isLoading: true
    })
    handleFetch(
      target,
      {
        current: pagination.current,
        sorter: sorter.order
      },
      successData => {
        pagination = successData.list.info
        this.setState({
          pagination,
          isLoading: false
        })
      },
      fail => {
        this.setState({
          isLoading: false
        })
        message.error('数据获取失败')
      }
    )
  }

  getLineOption = (xData, statsData) => {
    if (!statsData) {
      return {}
    }
    // 折线图数据
    const lineData = [
      {
        type: 'line',
        name: this.typeTextList,
        data: statsData.value[0],
        smooth: true,
        ...customize()
      }
    ]
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        show: false,
        type: 'category',
        data: xData,
        // 轴线两侧不留白
        boundaryGap: false
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      series: lineData
    }
    return option
  }

  tableConfig = tableData => {
    let config = {
      dataSource: [],
      columns: []
    }
    if (tableData) {
      const columns = []
      const dataSource = []
      tableData.label.map((label, idx) => {
        if (label === '周涨幅') {
          columns.push({
            title: label,
            dataIndex: `_${idx}`,
            sorter: true,
            render: (text, row, idx) =>
              text > 0 ? (
                <span className='rise up'>{`${text}%`}</span>
              ) : text === 0 ? (
                <span className='rise'>{text}</span>
              ) : (
                <span className='rise down'>{`${-text}%`}</span>
              )
          })
        } else if (idx === 1) {
          columns.push({
            title: label,
            dataIndex: `_${idx}`,
            className: 'highlight'
          })
        } else {
          columns.push({
            title: label,
            dataIndex: `_${idx}`
          })
        }
      })
      tableData.value.map((dataItem, dataIdx) => {
        dataSource.push({
          ...(() => {
            const item = {}
            for (let i = 0; i < dataItem.length; i++) {
              item[`_${i}`] = dataItem[i]
              item.key = dataIdx
            }
            return item
          })()
        })
      })
      config = {
        dataSource,
        columns
      }
    }

    return config
  }

  parseTopInfo = statsData => {
    let renderData = null
    if (statsData) {
      const dateData = statsData.value[0]
      const riseRate = statsData.value[1]
      renderData = (
        <div className='top-info'>
          <div className='title'>{this.typeTextList}</div>
          <div>
            <div className='sum'>{parseNumber(dateData.reduce((prev, next) => prev + next, 0))}</div>
            <div className={riseRate > 0 ? 'rate icon increase' : riseRate < 0 ? 'rate icon decrease' : 'rate'}>
              {riseRate < 0 ? `${-riseRate}%` : `${riseRate}%`}
            </div>
          </div>
        </div>
      )
    }
    return renderData
  }

  render () {
    const { pagination, isLoading } = this.state
    const { data } = this.props
    const statsData = data.stats
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div
            style={{
              flex: 1,
              height: 180
            }}
          >
            {this.parseTopInfo(statsData)}
            <ReactEchartsCore
              echarts={echarts}
              option={this.getLineOption(data.date, statsData)}
              theme='light'
              style={{
                width: '100%',
                height: 100,
                margin: '0 auto'
              }}
            />
          </div>
          {/* <div
            style={{
              flex: 1
            }}
          >
            {this.parseTopInfo(statsData, 2)}
            <ReactEchartsCore
              echarts={echarts}
              option={this.getLineOption(data.date, statsData, 2, typeTextList[1])}
              theme='light'
              style={{
                width: '90%',
                height: 500,
                margin: '0 auto'
              }}
            />
          </div> */}
        </div>
        <Table
          rowKey='key'
          {...this.tableConfig(data.list)}
          isLoading={isLoading}
          onChange={this.handleTableChange}
          pagination={{
            ...(data.list && data.list.info),
            ...paginationOptions,
            ...pagination
          }}
          scroll={IS_PC ? { x: true } : { x: 500 }}
        />
      </div>
    )
  }
}

SSComponent.propTypes = {
  data: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  handleFetch: PropTypes.func.isRequired
}

export default ChartWrapper()(SSComponent)
