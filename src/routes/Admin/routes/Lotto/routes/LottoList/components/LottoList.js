import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import {
  Table,
  Icon,
  Card,
  Button
} from 'antd'

import './LottoList.scss'

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
    lottoList: PropTypes.array,
    fetchLottoList: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.props.fetchLottoList()
  }

  onNewClick = () => {
    browserHistory.push('/admin/lotto/new')
  }

  render () {
    const {
      isLoading,
      lottoList
    } = this.props

    return (
      <div className='page-layout__wrapper list-wrapper'>
        <Helmet>
          <title>Lotto List</title>
        </Helmet>
        <h2 className='page-title'>List</h2>
        <div className='list-list'>
          <Card
            title={<span><Icon type='bars' /> List</span>}
            noHovering
            bordered={false}
            extra={<Button type='default' icon='plus' onClick={this.onNewClick}>New Lotto</Button>}>
            <Table
              columns={columns}
              dataSource={lottoList}
              loading={isLoading}
              size='middle'
              bordered />
          </Card>
        </div>
      </div>
    )
  }
}

export default List
