import React from 'react'
import PropTypes from 'prop-types'
import ChartWrapper from '../ChartWrapper'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import { IS_PC } from 'vutils/Tools'
const getOption = data => {
  const statsData = data.stats
  if (!statsData) {
    return {}
  }
  const renderData = []
  data.category.map((c_label, c_idx) => {
    renderData.push({
      name: c_label,
      icon: 'emptyCircle',
      ...(() => {
        let currentData = {
          value: 0
        }
        for (let dataIdx = 0; dataIdx < statsData.label.length; dataIdx++) {
          const value = statsData.value[c_idx][dataIdx]
          if (statsData.label[dataIdx] === '销售额') {
            currentData.value = value
          } else if (statsData.label[dataIdx] === '占比') {
            currentData.rate = value
          } else {
            const key = `data_${dataIdx}`
            currentData[key] = value
          }
        }
        return currentData
      })()
    })
  })
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      ...(IS_PC
        ? {
          right: '10%',
          top: 'middle',
          itemGap: 15
        }
        : {
          bottom: '5%',
          itemGap: 15
        }),
      orient: 'vertical',
      formatter: label => {
        const labelIdx = data.category.indexOf(label)
        let rate_str = ''
        let sale_str = ''
        statsData.label.map((dataItem, dataIdx) => {
          if (dataItem === '占比') {
            rate_str = `{rate||   ${statsData.value[labelIdx][dataIdx]}%}`
          }
          if (dataItem === '销售额') {
            sale_str = `{price|￥${statsData.value[labelIdx][dataIdx]}}`
          }
        })
        return `{label|${label}}` + rate_str + sale_str
      },
      data: renderData,
      textStyle: {
        color: '#4a5469',
        rich: {
          label: {
            width: 60
          },
          rate: {
            width: 70,
            fontWeight: 'bold'
          },
          price: {}
        }
      }
    },
    color: ['#78cd51', '#3f86ff', '#53a8e2', '#7ee1ff', '#abddff', '#ff6a6a', '#ffaf52', '#b17aff'],
    series: [
      {
        name: '热销分类',
        type: 'pie',
        ...(IS_PC
          ? {
            radius: ['30%', '55%'],
            center: ['30%', '50%']
          }
          : {
            radius: ['45%', '75%'],
            center: ['50%', '30%']
          }),
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          emphasis: {
            show: true,
            formatter: '{b}\n{big|￥{c}}',
            textStyle: {
              fontSize: 18,
              color: '#4f657c'
            }
          },
          rich: {
            big: {
              color: '#4a5469',
              fontSize: 37,
              lineHeight: 52
            }
          }
        },
        data: renderData
      }
    ]
  }
}

class HotCategory extends React.Component {
  constructor (props) {
    super(props)
    this.eventHandles = {
      mouseover: this.onPieMouseOver,
      globalout: this.onPieMouseOut
    }
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
    const { data } = this.props
    return (
      <ReactEchartsCore
        echarts={echarts}
        option={getOption(data)}
        onEvents={this.eventHandles}
        ref={el => {
          this._pie_chart = el
        }}
        style={{
          width: '100%',
          ...(IS_PC
            ? {
              height: 534
            }
            : {
              height: 470
            }),
          margin: 0
        }}
      />
    )
  }
}

HotCategory.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChartWrapper()(HotCategory)
