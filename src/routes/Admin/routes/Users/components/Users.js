import React, { Component } from 'react'
import {
  Table,
  Icon
} from 'antd'

import './Users.scss'

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
      <a href='#'>Action 一 {record.name}</a>
      <span className='ant-divider' />
      <a href='#'>Delete</a>
      <span className='ant-divider' />
      <a href='#' className='ant-dropdown-link'>
        More actions <Icon type='down' />
      </a>
    </span>
  ),
}]

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}]

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='users-wrapper'>
        <h2 className='page-title'>Users</h2>
        <div className='users-list'>
          <Table
            columns={columns}
            dataSource={data}
            size='middle'
            bordered />
        </div>
      </div>
    )
  }
}

export default Users