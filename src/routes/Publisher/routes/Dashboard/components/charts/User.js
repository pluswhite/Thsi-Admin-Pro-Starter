import React from 'react'
import PropTypes from 'prop-types'
import ChartWrapper from '../ChartWrapper'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import { Row, Col } from 'antd'
import { IS_PC } from 'vutils/Tools'

// const parseToolTip = params => {
//   let tip = params[0].axisValue
//   params.map(item => {
//     tip += `<br />${item.marker}${item.data.name}: ${item.data.value}人`
//   })
//   return tip
// }

const customizeData = {
  line: {
    symbol: ['emptyCircle', 'emptyDiamond', 'emptyTriangle'],
    symbolSize: 10,
    color: ['#3f86ff', '#78cd51', '#77daf8'],
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

const customize = idx => {
  let style = {}
  if (idx >= 0 && idx <= 2) {
    style = {
      symbol: customizeData.line.symbol[idx],
      symbolSize: customizeData.line.symbolSize,
      lineStyle: {
        color: customizeData.line.color[idx],
        width: customizeData.line.width,
        shadowColor: 'rgba(0, 0, 0, .12)',
        shadowOffsetX: 3,
        shadowOffsetY: 5,
        shadowBlur: 5
      },
      itemStyle: {
        color: customizeData.line.color[idx]
      }
    }
  }
  return style
}

class User extends React.Component {
  constructor (props) {
    super(props)
    this.lineEventHandles = {
      click: this.updatePie
    }
    this.pieEventHandles = type => ({
      mouseover: e => this.onPieMouseOver(e, type),
      globalout: e => this.onPieMouseOut(e, type)
    })
  }

  getLineOption = () => {
    const { data } = this.props
    const statsData = data.stats
    if (!statsData) {
      return {}
    }
    // 折线图数据
    const lineData = []
    statsData.label.map((label, idx) => {
      lineData.push({
        type: 'line',
        name: label,
        data: statsData.value[idx],
        smooth: true,
        ...customize(idx)
      })
    })
    let option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(43, 48, 62, .6)',
        extraCssText: 'box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.18);'
      },
      legend: {
        ...(IS_PC
          ? {
            left: '10%',
            itemGap: 50
          }
          : {
            left: 0,
            itemGap: 0,
            width: '100%'
          })
      },
      axisPointer: {
        lineStyle: {
          color: customizeData.axis.line.color,
          type: 'dotted'
        }
      },
      xAxis: {
        type: 'category',
        data: data.date,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: customizeData.axis.line.color
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          ...(IS_PC
            ? {
              margin: 30
            }
            : {
              margin: 10
            }),
          color: customizeData.axis.label.color
        }
      },
      yAxis: {
        type: 'value',
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
          ...(IS_PC
            ? {
              margin: 20
            }
            : {
              margin: 5
            }),
          color: customizeData.axis.label.color
        }
      },
      series: [...lineData]
    }
    return option
  }

  getPieOption = type => {
    const { data } = this.props
    const statsData = data.stats
    if (!statsData) {
      return {}
    }
    const renderData = this.renderPie(type)
    return {
      title: {
        text:
          type === 'plateform'
            ? `用户来源占比（${data.date[renderData.idx]}）`
            : `用户地域占比（${data.date[renderData.idx]}）`,
        textStyle: {
          color: '#4a5469',
          fontWeight: 'lighter'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        ...(IS_PC
          ? {
            right: 50
          }
          : {
            right: 10
          }),
        top: 'middle',
        itemGap: 15,
        textStyle: {
          color: '#4a5469'
        },
        data: renderData.data
      },
      color: ['#3f86ff', '#7ee1ff', '#53a8e2', '#e0f2ff', '#abcdef', '#abddff'],
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['35%', '55%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            emphasis: {
              show: true,
              formatter: '{d}%\n{small|{b}}',
              textStyle: {
                fontSize: 20,
                color: '#4a5469'
              }
            },
            rich: {
              small: {
                color: '#4a5469',
                lineHeight: 20
              }
            }
          },
          data: renderData.data
        }
      ]
    }
  }

  renderPie = (type, params = {}) => {
    const { data } = this.props
    const dataIndex = typeof params.dataIndex === 'number' ? params.dataIndex : data.date.length - 1
    let renderData = []
    if (type === 'plateform') {
      const plateformData = data.plateform
      plateformData.label.map((label, labelIdx) => {
        renderData.push({
          name: label,
          value: plateformData.value[labelIdx][dataIndex],
          icon: 'circle'
        })
      })
    } else if (type === 'region') {
      const regionData = data.region
      regionData[dataIndex].label.map((label, labelIdx) => {
        renderData.push({
          name: label,
          value: regionData[dataIndex].value[labelIdx],
          icon: 'circle'
        })
      })
    }
    return {
      data: renderData,
      idx: dataIndex
    }
  }

  updatePie = params => {
    const { data } = this.props
    const currentPlateform = this.renderPie('plateform', params)
    const currentRegion = this.renderPie('region', params)
    this._plateform_pie_chart.getEchartsInstance().setOption({
      title: {
        text: `用户来源占比（${data.date[currentPlateform.idx]}）`
      },
      legend: {
        data: currentPlateform.data
      },
      series: [
        {
          data: currentPlateform.data
        }
      ]
    })
    this._region_pie_chart.getEchartsInstance().setOption({
      title: {
        text: `用户地域占比（${data.date[currentPlateform.idx]}）`
      },
      legend: {
        data: currentRegion.data
      },
      series: [
        {
          data: currentRegion.data
        }
      ]
    })
  }

  // 组件初始化默认高亮
  componentDidUpdate () {
    this._plateform_pie_chart.getEchartsInstance().dispatchAction({
      type: 'highlight',
      // seriesIndex: 0,
      dataIndex: 0
    })
    this._region_pie_chart.getEchartsInstance().dispatchAction({
      type: 'highlight',
      // seriesIndex: 0,
      dataIndex: 0
    })
  }

  componentWillUpdate () {
    this._plateform_pie_chart.getEchartsInstance().dispatchAction({
      type: 'downplay',
      // seriesIndex: 0,
      dataIndex: 0
    })
    this._region_pie_chart.getEchartsInstance().dispatchAction({
      type: 'downplay',
      // seriesIndex: 0,
      dataIndex: 0
    })
  }

  onPieMouseOver = (e, type) => {
    if (e.dataIndex !== 0) {
      let targetChart = this._plateform_pie_chart
      if (type === 'region') {
        targetChart = this._region_pie_chart
      }
      targetChart.getEchartsInstance().dispatchAction({
        type: 'downplay',
        // seriesIndex: 0,
        dataIndex: 0
      })
    }
  }

  onPieMouseOut = (e, type) => {
    let targetChart = this._plateform_pie_chart
    if (type === 'region') {
      targetChart = this._region_pie_chart
    }
    targetChart.getEchartsInstance().dispatchAction({
      type: 'highlight',
      // seriesIndex: 0,
      dataIndex: 0
    })
  }

  render () {
    return (
      <Row>
        <Col xs={24} md={18}>
          <ReactEchartsCore
            echarts={echarts}
            option={this.getLineOption()}
            onEvents={this.lineEventHandles}
            // theme='light'
            style={{
              width: '100%',
              height: 500,
              margin: '0 auto'
            }}
          />
        </Col>
        <Col xs={24} md={6}>
          <ReactEchartsCore
            echarts={echarts}
            option={this.getPieOption('plateform')}
            onEvents={this.pieEventHandles('plateform')}
            ref={el => {
              this._plateform_pie_chart = el
            }}
            onChartReady={this.onReady}
            // theme='light'
            style={{
              width: '100%',
              height: 250,
              margin: '0 auto'
            }}
          />
          <ReactEchartsCore
            echarts={echarts}
            option={this.getPieOption('region')}
            onEvents={this.pieEventHandles('region')}
            ref={el => {
              this._region_pie_chart = el
            }}
            // theme='light'
            style={{
              width: '100%',
              height: 250,
              margin: '0 auto'
            }}
            // onChartReady={this.chartReady}
          />
        </Col>
      </Row>
    )
  }
}

User.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChartWrapper()(User)
