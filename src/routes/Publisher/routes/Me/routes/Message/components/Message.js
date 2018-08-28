import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import {
  Table,
  Card,
  Icon,
  Tag,
  Button
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

const pagination = {
  size: 'small',
  showSizeChanger: true,
  pageSizeOptions: ['10', '30', '50', '100'],
  showQuickJumper: true,
  showTotal: (total) => {
    return `总数 ${total} 项`
  }
}

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
    this.onReloadList()
  }

  onReloadList = () => {
    this.props.fetchMessage()
  }

  render () {
    const {
      isLoading,
      messageList
    } = this.props

    const columns = [
      {
        title: '消息',
        dataIndex: 'msg',
        key: 'msg'
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          if (text === 'read') {
            return <Tag color='#c0c0c0'>已读</Tag>
          } else {
            return <Tag color='#565656'>未读</Tag>
          }
        }
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => <a href='#'><Icon type='delete' /></a>
      }
    ]

    return (
      <div className='page-message__wrapper'>
        <Helmet>
          <title>消息</title>
        </Helmet>
        <h2 className='page-title'>消息</h2>
        <div className='msg-list'>
          <Card
            title={<span><Icon type='bars' /> 消息列表</span>}
            extra={
              <div>
                <Button type='default' shape='circle' icon='reload' title='重新加载列表' onClick={this.onReloadList} />
              </div>}
            bordered={false}
            >
            <Table
              columns={columns}
              expandedRowRender={record => <p>{record.description}</p>}
              // dataSource={messageList}
              dataSource={[]}
              pagination={pagination}
              loading={isLoading}
            />
          </Card>
        </div>
      </div>
    )
  }
}

export default Message
