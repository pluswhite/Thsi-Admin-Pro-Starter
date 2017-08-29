import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Icon,
  Card,
  Row,
  Col,

} from 'antd'

import './NewLotto.scss'

class List extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    // fetchNewLotto: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    // this.props.fetchNewLotto()
  }

  render () {
    const {
      isLoading,
    } = this.props

    return (
      <div className='page-layout__wrapper list-wrapper'>
        <h2 className='page-title'>New</h2>
        <div className='list-list'>
          <Card
            title={<span><Icon type='plus-circle-o' /> New</span>}
            noHovering
            bordered={false}>
            <Row>
              <Col span="8" />
              <Col span="8">
                Lotto Form.
              </Col>
              <Col span="8" />
            </Row>
          </Card>
        </div>
      </div>
    )
  }
}

export default List
