import React from 'react'
import PropTypes from 'prop-types'
import {
  Row
} from 'antd'
const HD = ({ title }) => {
  return (
    <Row className='hd' style={{
      width: '100%',
      fontSize: '1.2em',
      fontWeight: 'bold',
      borderBottom: '1px solid #eee',
      paddingBottom: 10,
      margin: '20px 0'
    }}>
      {title}：
    </Row>
  )
}

HD.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HD
