import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  Row,
  Col,
  Spin,
  Card,
} from 'antd'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'

import './Dashboard.scss'

class Dashboard extends Component {
  static propTypes = {
    intl: PropTypes.object,
    isLoading: PropTypes.bool,
    fetchDash: PropTypes.func.isRequired,
    stats: PropTypes.array
  }

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

  getLineOption = (originDashData) => {
    let newDashData = this.transferData(originDashData)
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
            // width: 2
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            // fontSize: 12
          }
        },
        data: newDashData.x
      },
      yAxis: {
        // interval: 200,
        min: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            // width: 2
          }
        },
        axisLabel: {
          textStyle: {
            // fontSize: 12
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
          // symbolSize: 9,
          label: {
            normal: {
              show: true,
              formatter: '{c}',
              textStyle: {
                // fontSize: 13
              }
            }
          },
          lineStyle: {
            normal: {
              // width: 3
            }
          },
          smooth: true
        }
      ]
    }
    return option
  }

  getBarOption = (originDashData) => {
    let newDashData = this.transferData(originDashData)
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
            // width: 2
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            // fontSize: 12
          }
        },
        data: newDashData.x
      },
      yAxis: {
        // interval: 200,
        min: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            // width: 2
          }
        },
        axisLabel: {
          textStyle: {
            // fontSize: 12
          }
        }
      },
      silent: false,
      series: [
        {
          type: 'bar',
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
                // fontSize: 13
              }
            }
          },
          lineStyle: {
            normal: {
              // width: 3
            }
          },
          smooth: true
        }
      ]
    }
    return option
  }

  getPieOption = () => {
    // let newDashData = this.transferData(originDashData)
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '血糖',
          type: 'pie',
          radius: [0, '80%'],
          center: ['50%', '50%'],
          data: [
            {
              value: 10,
              name: 'High'
            },
            {
              value: 10,
              name: 'Normal'
            },
            {
              value: 10,
              name: 'Low'
            }
          ]
        }
      ]
    }
    return option
  }

  getRadarOption = (data, indicator) => {
    let option = {
      radar: {
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Techology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }]
    }
    return option
  }

  render () {
    const {
      intl,
      isLoading,
      stats
    } = this.props

    const { formatMessage } = intl

    // console.log(stats)
    return (
      <div className='page-layout__wrapper dash-wrapper'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'dashboard',
              defaultMessage: 'Dashboard'
            })}
          </title>
        </Helmet>
        <h2 className='page-title'>
          {formatMessage({
            id: 'dashboard',
            defaultMessage: 'Dashboard'
          })}
        </h2>
        <div className='dash-infos'>
          <Row gutter={24}>
            <Col span={12}>
              <Card
                title={formatMessage({ id: 'dashboard.chart.linear', defaultMessage: 'Linear Chart' })}
                noHovering
                bordered={false}>
                <Spin spinning={isLoading}>
                  <ReactEchartsCore
                    echarts={echarts}
                    option={this.getLineOption(stats)}
                    notMerge
                    lazyUpdate
                    style={{
                      height: 450
                    }} />
                </Spin>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={formatMessage({ id: 'dashboard.chart.linear', defaultMessage: 'Bar Chart' })}
                noHovering
                bordered={false}>
                <Spin spinning={isLoading}>
                  <ReactEchartsCore
                    echarts={echarts}
                    option={this.getBarOption(stats)}
                    notMerge
                    lazyUpdate
                    style={{
                      height: 450
                    }} />
                </Spin>
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Card
                title={formatMessage({ id: 'dashboard.chart.linear', defaultMessage: 'Pie Chart' })}
                noHovering
                bordered={false}>
                <Spin spinning={isLoading}>
                  <ReactEchartsCore
                    echarts={echarts}
                    option={this.getPieOption(stats)}
                    notMerge
                    lazyUpdate
                    style={{
                      height: 450
                    }} />
                </Spin>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={formatMessage({ id: 'dashboard.chart.linear', defaultMessage: 'Radar Chart' })}
                noHovering
                bordered={false}>
                <Spin spinning={isLoading}>
                  <ReactEchartsCore
                    echarts={echarts}
                    option={this.getRadarOption(stats)}
                    notMerge
                    lazyUpdate
                    style={{
                      height: 450
                    }} />
                </Spin>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Dashboard
