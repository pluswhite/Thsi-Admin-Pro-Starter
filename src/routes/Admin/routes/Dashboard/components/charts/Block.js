import React from 'react'
import { Col } from 'antd'
import { blockIcon } from '../config'
import { parseNumber } from '../parseNumber'

const Block = props => {
  const data = props.data
  const statsData = data.stats
  let renderData = null
  if (statsData) {
    const blockWidth = 24 / data.block.length
    renderData = data.block.map((blockLabel, blockIdx) => {
      const currentStatsValue = statsData.value[blockIdx]
      return (
        <Col xs={24} sm={12} md={blockWidth} key={blockLabel} style={props.style}>
          <div className='wrap-outer'>
            <div className='wrap-inner'>
              <div className='left'>
                <img src={blockIcon[blockIdx]} alt={blockLabel} />
              </div>
              <div className='right'>
                <div className='title'>
                  <div className='label'>{blockLabel}</div>
                  <div
                    className={
                      currentStatsValue[1] > 0
                        ? 'rate icon increase'
                        : currentStatsValue[1] < 0 ? 'rate icon decrease' : 'rate'
                    }
                    title={`${currentStatsValue[1]}%`}
                  >
                    {currentStatsValue[1] < 0 ? `${-currentStatsValue[1]}%` : `${currentStatsValue[1]}%`}
                  </div>
                </div>
                <div className='value' title={parseNumber(currentStatsValue[0])}>
                  {parseNumber(currentStatsValue[0])}
                </div>
              </div>
            </div>
          </div>
        </Col>
      )
    })
  }
  return renderData
}

Block.propTypes = {}

export default Block
