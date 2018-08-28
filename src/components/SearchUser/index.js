import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, Spin, Icon, Avatar } from 'antd'
import store from 'store'
import { requestAuthInstance, ApiList } from 'vstore/auth'

import './index.scss'

const Option = Select.Option

const toFetch = (params, successCallback, errorCallback) => {
  return requestAuthInstance
    .get(ApiList.common.search_user, {
      headers: {
        Authorization: store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...params,
        rnd: new Date().getTime()
      }
    })
    .then(res => {
      if (res.data.status === 'success') {
        successCallback && successCallback(res.data.data)
      } else {
        errorCallback && errorCallback()
      }
    })
    .catch(err => {
      errorCallback && errorCallback()
      console.log(err)
    })
}

// ==================== component =======================
class SearchUser extends Component {
  constructor(props) {
    super(props)
    this.storageKey = `${props.storageKey || ''}` + '_search_user_history'
    const history = store.get(this.storageKey) || []
    this.state = {
      value: props.value,
      fetching: false,
      occurError: false,
      data: history
    }
  }

  fetchUser = (value, scb, fcb) => {
    if (value.trim() === '') {
      return
    }
    this.setState({
      // 搜索输入时不应设置data为[]，否则当前selected项的value会显示在输入框上
      // data: [],
      value: undefined,
      fetching: true,
      occurError: false
    })

    toFetch(
      {
        searchStr: value
      },
      successData => {
        this.setState({
          data: successData,
          fetching: false
        }, () => {
          scb && scb()
        })
      },
      fail => {
        this.setState({
          fetching: false,
          occurError: true
        }, () => {
          fcb && fcb()
        })
      }
    )
  }

  handleChange = value => {
    const { onChange } = this.props
    const { data } = this.state
    // 更新form的value
    if (onChange) {
      onChange(value)
    }
    // 更新storage
    let currentUser = {}
    data.map(item => {
      if (item.id === value) {
        currentUser = item
      }
    })
    const history = store.get(this.storageKey) || []
    history.map((item, idx) => {
      if (item.id === currentUser.id) {
        history.splice(idx, 1)
      }
    })
    currentUser.id && history.unshift(currentUser)
    store.set(this.storageKey, history.slice(0, 5))
    this.setState({
      data: history
    })
  }

  // FIXED: 表单重置无法清除搜索用户UI显示
  componentWillReceiveProps(nextProps) {
    const value = nextProps.value
    // console.log(value)
    if (typeof value === 'object') {
      // 解决订单列表页面筛选用户的显示问题
      this.fetchUser(
        value.user_name,
        () => {
          this.setState({
            value: value.user_id
          })
        },
        () => {
          this.setState({
            value: value.user_name
          })
        })
    } else {
      this.setState({
        value: nextProps.value
      })
    }
  }

  handleFocus = () => {
    // const history = store.get(this.storageKey) || []
    // this.setState({
    //   data: history
    // })
  }

  render() {
    const { fetching, data, value, occurError } = this.state
    return (
      <Select
        className='search-user'
        dropdownClassName='search-user-dropdown'
        allowClear
        showSearch
        showArrow={false}
        defaultActiveFirstOption={false}
        placeholder='请输入用户名称'
        notFoundContent={
          fetching ? (
            <Spin size='small' />
          ) : occurError ? (
            <span style={{ color: '#FD6B6D' }}>
              <Icon type='exclamation-circle-o' /> 抱歉，获取失败
            </span>
          ) : null
        }
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        filterOption={false}
        value={value}
        style={{ width: '100%' }}
      >
        {data.map(item => (
          <Option key={item.id} value={item.id}>
            <Avatar src={item.avatar} />
            {item.name}
          </Option>
        ))}
      </Select>
    )
  }
}

SearchUser.propTypes = {
  // value和onChange由form生成
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  storageKey: PropTypes.string
}

export default SearchUser
