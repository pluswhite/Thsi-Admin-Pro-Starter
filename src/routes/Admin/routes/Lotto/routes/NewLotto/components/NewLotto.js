import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Icon,
  Card
} from 'antd'

import './NewLotto.scss'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href='#'>{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href='#' title='Edit'><Icon type='edit' /></a>
      <span className='ant-divider' />
      <a href='#' title='Delete'><Icon type='delete' /></a>
      <span className='ant-divider' />
      <a href='#' className='ant-dropdown-link' title='Actions'>
        <Icon type='ellipsis' />
      </a>
    </span>
  )
}]

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
          </Card>
        </div>
      </div>
    )
  }
}

export default List
