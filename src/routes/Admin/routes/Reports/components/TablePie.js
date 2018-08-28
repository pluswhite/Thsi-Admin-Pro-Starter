import React from 'react'
import PropTypes from 'prop-types'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
// import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'

const colorPie = [
  ['#7CDFFD', '#53a4ea', '#c7e47a', '#87ceff'],
  ['#47a4e4', '#c7e47a', '#82e1fd', '#8acffd', '#4489fb', '#7bcb58', '#fdae5b', '#fd6b6d', '#b17aff'],
  ['#7bcb58', '#fdae5b', '#fd6b6d', '#8acffd', '#4489fb', '#47a4e4', '#c7e47a', '#82e1fd', '#b17aff'],
  ['#b17aff', '#fdae5b', '#fd6b6d', '#8acffd', '#4489fb', '#ffdc4f', '#7bcb58', '#47a4e4', '#c7e47a'],
  ['#3f86ff', '#53a8e2', '#7ee1ff']
]

function getOption(data, title) {
  const sum = data.reduce((p, n) => p + n.value, 0)
  let option = {
    // animation: false,
    tooltip: {
      show: true,
      trigger: 'item'
    },
    legend: {
      show: true,
      bottom: 0
      // orient: 'vertical',
      // right: 0,
      // top: 'middle'
    },
    color: (() => {
      switch (title) {
        case '订单类型':
          return colorPie[0]
        case '订单地域':
        case '用户地域':
          return colorPie[1]
        case '热门标签':
          return colorPie[2]
        case '热门分类':
          return colorPie[3]
        case '访问来源':
          return colorPie[4]
        default:
          return colorPie[1]
      }
    })(),
    series: [
      {
        name: title,
        type: 'pie',
        center: ['50%', 100],
        radius: [0, 70],
        label: {
          show: true,
          formatter: '{d}%',
          position: 'inside'
        },
        labelLine: {
          length: 7,
          length2: 10
        },
        data:
          data &&
          data.map(item => ({
            name: item.label,
            value: item.value,
            label: {
              position: (() => {
                let p = 'inside'
                if (item.value / sum <= 0.1) {
                  p = 'outside'
                }
                return p
              })()
            }
          }))
      }
    ]
  }
  return option
}

const TablePie = ({ data, title }) => {
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={getOption(data, title)}
      // notMerge
      // lazyUpdate
      style={{
        width: 250,
        height: 250,
        margin: '0 auto'
      }}
    />
  )
}

TablePie.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
}

export default TablePie
