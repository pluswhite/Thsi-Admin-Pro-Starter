import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import {
  Table,
  Card,
  Icon,
  Tag
} from 'antd'

import './Message.scss'

const columns = [
  {
    title: 'Message',
    dataIndex: 'msg',
    key: 'msg'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record, index) => {
      if (text === 'read') {
        return <Tag color='#c0c0c0'>Read</Tag>
      } else {
        return <Tag color='#565656'>Unread</Tag>
      }
    }
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href='#'><Icon type='delete' /></a>
  }
]

/**
const data = [
  {
    key: 1,
    msg: 'John Brown',
    date: '2017-08-21 17:08:03',
    status: 'read',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    msg: 'Jim Green',
    date: '2017-08-21 17:08:03',
    status: 'unread',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    msg: 'Joe Black',
    date: '2017-08-21 17:08:03',
    status: 'unread',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
]
  *
  */

class Message extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    messageList: PropTypes.array.isRequired,
    fetchMessage: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.props.fetchMessage()
  }

  render () {
    const {
      isLoading,
      messageList
    } = this.props

    return (
      <div className='page-layout__container'>
        <Helmet>
          <title>Message</title>
        </Helmet>
        <h2 className='page-title'>Message</h2>
        <div className='msg-list'>
          <Card
            title={<span><Icon type='bars' /> List</span>}
            noHovering
            bordered={false}
            >
            <Table
              columns={columns}
              expandedRowRender={record => <p>{record.description}</p>}
              dataSource={messageList}
              loading={isLoading}
              size='middle'
              bordered
            />
          </Card>
        </div>
      </div>
    )
  }
}

export default Message
