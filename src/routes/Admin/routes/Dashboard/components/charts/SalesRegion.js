import React from 'react'
import PropTypes from 'prop-types'
import ChartWrapper from '../ChartWrapper'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/map/js/china'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import { Row, Col } from 'antd'
import { IS_PC } from 'vutils/Tools'
const customizeData = {
  color: {
    cpd: '#53a4ea',
    cpc: '#c7e47a',
    cps: '#87ceff'
    // all: '#ffaf52',
    // other: '#7CDFFD'
  },
  line: {
    symbol: 'emptyCircle',
    symbolSize: 10,
    width: 3
  },
  axis: {
    line: {
      color: '#e8f0f7'
    },
    label: {
      color: '#778197'
    }
  }
}

const customize = label => {
  return {
    itemStyle: {
      color: customizeData.color[label.toLowerCase()]
    }
  }
}

class SalesRegion extends React.Component {
  constructor (props) {
    super(props)
    this.eventHandles = {
      click: this.updatePie
    }
    this.pieEventHandles = {
      mouseover: this.onPieMouseOver,
      globalout: this.onPieMouseOut
    }
  }

  getMapOption = () => {
    const { data } = this.props
    const statsData = data.stats
    if (!statsData) {
      return {}
    }
    // 最大数值
    let MAX = 1
    const renderData = []
    statsData.label.map((label, dataIdx) => {
      if (label === '全部') {
        data.region.map((regionItem, regionIdx) => {
          if (regionItem !== '全国') {
            const value = statsData.value[regionIdx][dataIdx]
            MAX = MAX > value ? MAX : value
          }
        })
      } else {
        renderData.push({
          name: label,
          type: 'map',
          mapType: 'china',
          showLegendSymbol: false,
          ...customize(label),
          ...(IS_PC
            ? {
              top: 'auto'
            }
            : {
              top: '15%'
            }),
          label: {
            normal: {
              ...(IS_PC
                ? {
                  show: true
                }
                : {
                  show: false
                })
            },
            emphasis: {
              show: true
            }
          },
          // ...customize(idx)
          data: data.region.map((regionItem, regionIdx) => {
            if (regionItem === '全国') {
            } else {
              const value = statsData.value[regionIdx][dataIdx]
              return {
                name: regionItem,
                value
              }
            }
          })
        })
      }
    })

    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {},
      visualMap: [
        {
          min: 0,
          max: MAX,
          text: ['High', 'Low'], // 文本，默认为数值文本
          calculable: true,
          ...(IS_PC
            ? {
              orient: 'vertical',
              left: '5%',
              top: 'bottom'
            }
            : {
              orient: 'horizontal',
              left: 'center',
              bottom: 20
            }),
          inRange: {
            color: ['#DDFDFF', '#0F78E0']
          },
          outOfRange: {
            color: ['#DDFDFF', '#0F78E0']
          }
        }
      ],
      series: [...renderData]
    }
    return option
  }

  getPieOption = () => {
    const { data } = this.props
    const statsData = data.stats
    if (!statsData) {
      return {}
    }
    const renderData = this.renderPie()
    return {
      title: {
        text: renderData.idx === -1 ? '全国' : data.region[renderData.idx],
        left: 'center',
        bottom: 0,
        textStyle: {
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            emphasis: {
              show: true,
              formatter: '{big|{b}}\n{d}%',
              textStyle: {
                fontSize: 18,
                color: '#4f657c'
              }
            },
            rich: {
              big: {
                color: '#4a5469',
                fontSize: 32,
                lineHeight: 52
              }
            }
          },
          data: renderData.data
        }
      ]
    }
  }

  renderPie = (params = {}) => {
    const { data } = this.props
    // dataIndex在bar图下有可能为0
    let dataIndex = typeof params.dataIndex === 'number' ? params.dataIndex : -1
    const { stats } = data
    let currentPieData = []
    if (dataIndex === -1) {
      // 点击map未有对应省份
      // 渲染全国省份订单总量饼图
      data.region.map((regionItem, regionIdx) => {
        if (regionItem === '全国') {
          // dataIndex += 1
        } else {
          stats.label.map((labelItem, labelIdx) => {
            if (labelItem === '全部') {
              currentPieData.push({
                name: regionItem,
                value: stats.value[regionIdx][labelIdx]
              })
            }
          })
        }
      })
    } else {
      // 渲染单个省份订单类型饼图
      if (params.componentSubType === 'bar') {
        // 如果事件从bar图而来，因为bar图不渲染全国项，为与stats.value中的数据对应，全国项之后的省份idx应+1
        const qgIdx = data.region.indexOf('全国')
        if (dataIndex >= qgIdx) {
          dataIndex += 1
        }
      }
      stats.label.map((labelItem, labelIdx) => {
        if (labelItem !== '全部') {
          currentPieData.push({
            name: labelItem,
            value: stats.value[dataIndex][labelIdx],
            itemStyle: {
              color: customizeData.color[labelItem.toLowerCase()]
            }
          })
        }
      })
    }
    return {
      data: currentPieData,
      idx: dataIndex
    }
  }

  updatePie = params => {
    const { data } = this.props
    const currentPieData = this.renderPie(params)
    const targetChart = this._pie_chart.getEchartsInstance()
    targetChart.setOption({
      title: {
        text: currentPieData.idx !== -1 ? data.region[currentPieData.idx] : '全国'
      },
      series: [
        {
          data: currentPieData.data
        }
      ]
    })
    targetChart.dispatchAction({
      type: 'downplay',
      // seriesIndex: 0,
      dataIndex: 0
    })
    setTimeout(() => {
      targetChart.dispatchAction({
        type: 'highlight',
        // seriesIndex: 0,
        dataIndex: 0
      })
    }, 200)
  }

  getBarOption = () => {
    const { data } = this.props
    const statsData = data.stats
    if (!statsData) {
      return {}
    }

    const renderData = []
    statsData.label.map((labelItem, labelIdx) => {
      if (labelItem === '全部') {
      } else {
        renderData.push({
          type: 'bar',
          name: labelItem,
          stack: 'all',
          // data: data.region.map((regionItem, regionIdx) => {
          //   if (regionItem === '全国') {
          //   } else {
          //     return statsData.value[regionIdx][labelIdx]
          //   }
          // })
          data: (() => {
            let array = []
            const regions = data.region
            for (let regionIdx = 0; regionIdx < regions.length; regionIdx++) {
              if (regions[regionIdx] !== '全国') {
                array.push(statsData.value[regionIdx][labelIdx])
              }
            }
            return array
          })(),
          ...customize(labelItem)
        })
      }
    })
    return {
      legend: {
        right: '10%',
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      // xAxis: {
      //   type: 'value'
      // },
      xAxis: {
        type: 'value',
        data: data.date,
        boundaryGap: false,
        splitLine: {
          lineStyle: {
            color: customizeData.axis.line.color
          }
        },
        axisLine: {
          lineStyle: {
            color: customizeData.axis.line.color
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: customizeData.axis.label.color
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: customizeData.axis.line.color
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: customizeData.axis.label.color
        },
        data: data.region.filter(item => item !== '全国')
      },
      series: renderData
    }
  }

  renderTotalInfo = () => {
    let renderData = null
    const { data } = this.props
    const statsData = data.stats
    if (statsData) {
      const labelDataList = []
      const qgIdx = data.region.indexOf('全国')
      if (qgIdx !== -1) {
        statsData.label.map((labelItem, labelIdx) => {
          if (labelItem === '全部') {
            labelDataList.splice(0, 0, {
              label: labelItem,
              value: statsData.value[qgIdx][labelIdx]
            })
          } else {
            labelDataList.push({
              label: labelItem,
              value: statsData.value[qgIdx][labelIdx]
            })
          }
        })
        renderData = labelDataList.map(item => {
          return <span key={item.label}>{`${item.label}: ${item.value}`}</span>
        })
      }
    }
    return <div className='total'>{renderData}</div>
  }

  // 组件初始化默认高亮
  componentDidUpdate () {
    this._pie_chart.getEchartsInstance().dispatchAction({
      type: 'highlight',
      // seriesIndex: 0,
      dataIndex: 0
    })
  }

  componentWillUpdate () {
    this._pie_chart.getEchartsInstance().dispatchAction({
      type: 'downplay',
      // seriesIndex: 0,
      dataIndex: 0
    })
  }

  onPieMouseOver = e => {
    if (e.dataIndex !== 0) {
      let targetChart = this._pie_chart
      targetChart.getEchartsInstance().dispatchAction({
        type: 'downplay',
        // seriesIndex: 0,
        dataIndex: 0
      })
    }
  }

  onPieMouseOut = e => {
    let targetChart = this._pie_chart
    targetChart.getEchartsInstance().dispatchAction({
      type: 'highlight',
      // seriesIndex: 0,
      dataIndex: 0
    })
  }

  render () {
    return (
      <Row>
        <Col xs={24} md={12}>
          <ReactEchartsCore
            echarts={echarts}
            option={this.getMapOption()}
            onEvents={this.eventHandles}
            theme='light'
            style={{
              width: '100%',
              margin: 0,
              ...(IS_PC
                ? {
                  height: 500
                }
                : {
                  height: 300
                })
            }}
          />
          <ReactEchartsCore
            echarts={echarts}
            option={this.getPieOption()}
            onEvents={this.pieEventHandles}
            ref={el => {
              this._pie_chart = el
            }}
            theme='light'
            style={{
              width: '100%',
              height: 300,
              margin: 0
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          {this.renderTotalInfo()}
          <ReactEchartsCore
            echarts={echarts}
            option={this.getBarOption()}
            onEvents={this.eventHandles}
            theme='light'
            style={{
              width: '100%',
              height: 800,
              margin: 0
            }}
          />
        </Col>
      </Row>
    )
  }
}

SalesRegion.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChartWrapper()(SalesRegion)
