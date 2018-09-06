import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Card, Row, Col, Button, Icon, Pagination, Spin, Table } from 'antd'

// import './list.scss'

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}]

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}]

/**
 * 页面主组件
 */
class ActList extends Component {
  static propTypes = {
  //   fetchActivityType: PropTypes.func.isRequired,
  //   activityTypeList: PropTypes.array.isRequired,
  //   isLoading: PropTypes.bool.isRequired,
  //   fetchZonelistSuccess: PropTypes.bool.isRequired,
  //   Zonelist: PropTypes.array.isRequired,
  //   fetchZonelist: PropTypes.func.isRequired,
  //   pagination: PropTypes.object.isRequired,
  //   // updateProduct: PropTypes.func.isRequired,
  //   // addProduct: PropTypes.func.isRequired,
  //   updateStatus: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      // pagination: {
      //   current: 1,
      //   pageSize: 30,
      //   total: 0
      // },
      // itemWidth: 250
    }
  }

  componentWillMount = () => {
    // this.props.fetchActivityType()
  }

  componentDidMount = () => {
    // this.fetchData()
    // this.toFetchData()
  }

  onReloadList = () => {
    this.toFetchData()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.toFetchData()
  }

  handleReset = () => {
    this._filter.props.form.resetFields()
  }

  render () {
    const {
      // activityTypeList,
      // isLoading,
      // pagination,
      // Zonelist,
      // updateStatus,
      // fetchZonelistSuccess
    } = this.props
    // const { itemWidth } = this.state
    return (
      <div className='act-list-wrapper'>
        <Helmet>
          <title>Page1</title>
        </Helmet>
        <div className='zone-list'>
          <Card
            title={
              <span>
                <Icon type='bars' /> List
              </span>
            }
            extra={
              <div>
                <Button type='default' shape='circle' icon='reload' title='Reload' onClick={this.onReloadList} />
                <Button type='default' icon='plus' title='New' onClick={this.onNewClick}>
                  New
                </Button>
              </div>
            }
            bordered={false}
          >
            <Table size='middle' dataSource={dataSource} columns={columns} />
          </Card>
        </div>
      </div>
    )
  }
}

export default ActList
