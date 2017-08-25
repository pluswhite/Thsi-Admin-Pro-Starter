import React, { Component } from 'react'
import {
  Table,
  Icon,
  Card
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

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.props.fetchUsers()
  }

  render () {
    const {
      isLoading,
      userList
    } = this.props

    return (
      <div className='page-layout__wrapper users-wrapper'>
        <h2 className='page-title'>Users</h2>
        <div className='users-list'>
          <Card
            title={<span><Icon type='bars' /> List</span>}
            noHovering={true}
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

export default Users
