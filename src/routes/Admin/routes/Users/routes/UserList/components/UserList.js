import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import {
  Table,
  Icon,
  Card
} from 'antd'

import './UserList.scss'

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
      <a href='#'><Icon type='edit' /></a>
      <span className='ant-divider' />
      <a href='#'><Icon type='delete' /></a>
      <span className='ant-divider' />
      <a href='#' className='ant-dropdown-link'>
        Actions <Icon type='down' />
      </a>
    </span>
  ),
}]

class List extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    userList: PropTypes.array,
    fetchList: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.props.fetchList()
  }

  render () {
    const {
      isLoading,
      userList
    } = this.props

    return (
      <div className='page-layout__wrapper'>
        <Helmet>
          <title>User List</title>
        </Helmet>
        <h2 className='page-title'>List</h2>
        <div className='user-list-wrapper'>
          <Card
            title={<span><Icon type='bars' /> List</span>}
            noHovering
            bordered={false}>
            <Table
              columns={columns}
              dataSource={userList}
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
