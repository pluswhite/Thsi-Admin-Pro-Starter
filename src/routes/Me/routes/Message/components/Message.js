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
    intl: PropTypes.object,
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
      intl,
      isLoading,
      messageList
    } = this.props

    const {
      formatMessage
    } = intl

    const columns = [
      {
        title: formatMessage({
          id: 'message.list.message',
          defaultMessage: 'Message'
        }),
        dataIndex: 'msg',
        key: 'msg'
      },
      {
        title: formatMessage({
          id: 'message.list.date',
          defaultMessage: 'Date'
        }),
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: formatMessage({
          id: 'message.list.status',
          defaultMessage: 'Status'
        }),
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          if (text === 'read') {
            return <Tag color='#c0c0c0'>{formatMessage({ id: 'message.list.status.read', defaultMessage: 'Read' })}</Tag>
          } else {
            return <Tag color='#565656'>{formatMessage({ id: 'message.list.status.unread', defaultMessage: 'Unread' })}</Tag>
          }
        }
      },
      {
        title: formatMessage({
          id: 'message.list.action',
          defaultMessage: 'Action'
        }),
        dataIndex: '',
        key: 'x',
        render: () => <a href='#'><Icon type='delete' /></a>
      }
    ]

    return (
      <div className='page-layout__viewport'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'message.title',
              defaultMessage: 'Message'
            })}
          </title>
        </Helmet>
        <h2 className='page-title'>
          {formatMessage({
            id: 'message.title',
            defaultMessage: 'Message'
          })}
        </h2>
        <div className='msg-list'>
          <Card
            title={<span><Icon type='bars' /> {formatMessage({ id: 'message.list', defaultMessage: 'List' })}</span>}
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
