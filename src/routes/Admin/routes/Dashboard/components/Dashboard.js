import React, { Component } from 'react'
import { Spin } from 'antd'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

import './Dashboard.scss'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.props.fetchDash()
  }

  transferData = (data) => {
    let xData = []
    let yData = []
    data.map((item, index) => {
      xData.push(item.x)
      yData.push(item.y)
    })

    return {
      'x': xData,
      'y': yData
    }
  }

  getOption = (balanceGraph) => {
    let newDashData = this.transferData(balanceGraph)
    let option = {
      grid: {
        // show: true,
        top: '13.5%',
        left: '1%',
        right: '5%',
        bottom: '13.5%',
        containLabel: true
      },
      // tooltip: false,
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true,
          lineStyle: {}
        },
        splitLine: {
          show: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            width: 2
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            fontSize: 12
          }
        },
        data: newDashData.x
      },
      yAxis: {
        interval: 200,
        min: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 2
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 12
          }
        }
      },
      silent: false,
      series: [
        {
          type: 'line',
          data: newDashData.y,
          itemStyle: {
            normal: {
            }
          },
          symbolSize: 9,
          label: {
            normal: {
              show: true,
              formatter: '{c}',
              textStyle: {
                fontSize: 13
              }
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          },
          smooth: true
        }
      ]
    }
    return option
  }

  render () {
    const {
      isLoading,
      stats
    } = this.props

    // console.log(stats)
    return (
      <div className='dash-wrapper'>
        <h2 className='page-title'>Dashboard</h2>
        <div className='dash-infos'>
          <Spin spinning={isLoading}>
            <ReactEchartsCore
              echarts={echarts}
              option={this.getOption(stats)}
              notMerge
              lazyUpdate
              style={{
                height: 450
              }} />
          </Spin>
        </div>
      </div>
    )
  }
}

export default Dashboard
