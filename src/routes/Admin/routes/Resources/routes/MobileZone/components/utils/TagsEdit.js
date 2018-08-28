import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Input, Tooltip, Icon } from 'antd';

export default class TagsEdit extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      tags: props.value || [],
      inputVisible: false,
      inputValue: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      tags: nextProps.value
    })
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags }, () => {
      // 更新form的value
      this.handleFormChange(tags)
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const state = this.state
    const inputValue = state.inputValue
    let tags = state.tags
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => {
      // 更新form的value
      this.handleFormChange(tags)
    })
  }

  handleFormChange = tags => {
    const { onChange } = this.props
    // 更新form的value
    if (onChange) {
      onChange(tags)
    }
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state
    const { disabled } = this.props
    return (
      <div>
        {(disabled && tags.length === 0) ? '（空）' : tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag color='red' key={tag} closable={!disabled} afterClose={() => this.handleClose(tag)} style={{
              margin: '0 10px 10px 0'
            }}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && !disabled && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type='plus' /> 标签
          </Tag>
        )}
      </div>
    )
  }
}
