import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import {
  Table,
  Icon,
  Card
} from 'antd'

import './UserList.scss'

class List extends Component {
  static propTypes = {
    intl: PropTypes.object,
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
      intl,
      isLoading,
      userList
    } = this.props

    const { formatMessage } = intl

    const columns = [{
      title: formatMessage({
        id: 'user.list.name',
        defaultMessage: 'Name'
      }),
      dataIndex: 'name',
      key: 'name',
      render: text => <a href='#'>{text}</a>,
    }, {
      title: formatMessage({
        id: 'user.list.age',
        defaultMessage: 'Age'
      }),
      dataIndex: 'age',
      key: 'age',
    }, {
      title: formatMessage({
        id: 'user.list.address',
        defaultMessage: 'Address'
      }),
      dataIndex: 'address',
      key: 'address',
    }, {
      title: formatMessage({
        id: 'user.list.action',
        defaultMessage: 'Action'
      }),
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

    return (
      <div className='page-layout__wrapper'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'user.list.title',
              defaultMessage: 'User List'
            })}
          </title>
        </Helmet>
        <h2 className='page-title'>
          {formatMessage({
            id: 'user.list',
            defaultMessage: 'List'
          })}
        </h2>
        <div className='user-list-wrapper'>
          <Card
            title={<span><Icon type='bars' /> {formatMessage({ id: 'user.list', defaultMessage: 'List' })}</span>}
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
