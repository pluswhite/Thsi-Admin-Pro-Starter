import React from 'react'
import PropTypes from 'prop-types'
import ChartWrapper from '../ChartWrapper'
import { Table } from 'antd'
import { IS_PC } from 'vutils/Tools'
const tableConfig = data => {
  let config = {
    dataSource: [],
    columns: []
  }
  const statsData = data.stats
  if (statsData) {
    const dataSource = []
    const columns = []
    statsData.value.map((dataItem, dataIdx) => {
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
    statsData.label.map((label, idx) => {
      if (label === '排名') {
        columns.push({
          title: label,
          dataIndex: `_${idx}`,
          render: (text, row, idx) => <span className={`rank rank${text}`}>{text}</span>
        })
      } else if (label === '订单数') {
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
    config = {
      dataSource,
      columns
    }
  }

  return config
}

const HotGoods = ({ data }) => {
  return <Table {...tableConfig(data)} rowKey='key' pagination={false} scroll={IS_PC ? { x: true } : { x: 500 }} />
}

HotGoods.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChartWrapper()(HotGoods)
