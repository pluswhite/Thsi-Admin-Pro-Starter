import React from 'react'
import PropTypes from 'prop-types'
import ChartWrapper from '../ChartWrapper'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import { IS_PC } from 'vutils/Tools'

const customizeData = {
  color: {
    cpd: '#53a4ea',
    cpc: '#c7e47a',
    cps: '#87ceff',
    all: '#ffaf52',
    other: '#7CDFFD'
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
  let style = {}
  if (label === '总数') {
    style = {
      symbol: customizeData.line.symbol,
      symbolSize: customizeData.line.symbolSize,
      lineStyle: {
        color: customizeData.color.all,
        width: customizeData.line.width,
        shadowColor: 'rgba(0, 0, 0, .12)',
        shadowOffsetX: 3,
        shadowOffsetY: 5,
        shadowBlur: 5
      },
      itemStyle: {
        color: customizeData.color.all
      }
    }
  } else {
    style = {
      itemStyle: {
        color: customizeData.color[label.toLowerCase()] || customizeData.color.other
      }
    }
  }
  return style
}

class Sales extends React.Component {
  constructor(props) {
    super(props)
    this.eventHandles = {
      click: this.updatePie
    }
  }

  getBarOption = () => {
    const { data } = this.props
    const statsData = data.stats
    if (!statsData) {
      return {}
    }
    // 折线图数据
    const renderData = []
    statsData.label.map((label, idx) => {
      if (label === '总数') {
        renderData.push({
          type: 'line',
          name: label,
          data: statsData.value[idx],
          smooth: true,
          ...customize(label)
        })
      } else {
        renderData.push({
          type: 'bar',
          name: label,
          stack: 'all',
          data: statsData.value[idx],
          ...customize(label)
        })
      }
    })
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '10%',
        right: '10%'
      },
      xAxis: {
        type: 'category',
        data: data.date,
        axisLine: {
          lineStyle: {
            color: customizeData.axis.line.color
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 30,
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
          margin: 20,
          color: customizeData.axis.label.color
        }
      },
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
        subtext: `日期：${data.date[renderData.idx]}`,
        ...(IS_PC
          ? {
            right: 50,
            top: 20
          }
          : {
            left: 70,
            top: 70
          })
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}: {c}（{d}%）'
      },
      series: [
        {
          ...(IS_PC
            ? {
              radius: [0, '45%'],
              center: ['50%', '40%']
            }
            : {
              radius: [0, 30],
              center: [50, 100]
            }),
          name: '订单类型占比',
          type: 'pie',
          label: {
            position: 'inside'
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          data: renderData.data
        }
      ]
    }
  }

  renderPie = (params = {}) => {
    const { data } = this.props
    const dataIndex = typeof params.dataIndex === 'number' ? params.dataIndex : data.date.length - 1
    const { stats } = data
    let currentPieData = []
    stats.label.map((label, labelIdx) => {
      if (label === '总数') {
        return
      }
      currentPieData.push({
        name: label,
        value: stats.value[labelIdx][dataIndex],
        itemStyle: {
          color: (() => {
            if (label === '未知') {
              return customizeData.color.other
            } else {
              return customizeData.color[label.toLowerCase()]
            }
          })()
        }
      })
    })
    return {
      data: currentPieData,
      idx: dataIndex
    }
  }

  updatePie = params => {
    const currentPieData = this.renderPie(params)
    const { data } = this.props
    this._pie_chart.getEchartsInstance().setOption({
      title: {
        subtext: `日期：${data.date[currentPieData.idx]}`
      },
      series: [
        {
          data: currentPieData.data
        }
      ]
    })
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          position: 'relative'
        }}
      >
        <ReactEchartsCore
          echarts={echarts}
          option={this.getBarOption()}
          onEvents={this.eventHandles}
          theme='light'
          style={{
            width: '100%',
            height: 500,
            margin: '0 auto'
          }}
        />
        <ReactEchartsCore
          echarts={echarts}
          option={this.getPieOption()}
          ref={el => {
            this._pie_chart = el
          }}
          theme='light'
          style={{
            width: 300,
            height: 300,
            margin: '0 auto',
            position: 'absolute',
            left: '7%',
            top: '-7%'
          }}
        />
      </div>
    )
  }
}

Sales.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChartWrapper()(Sales)
