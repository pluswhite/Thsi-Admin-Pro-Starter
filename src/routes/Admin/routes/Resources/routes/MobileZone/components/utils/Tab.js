import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Icon } from 'antd'
import './Tab.scss'

const LOGO = 'http://wx.qlogo.cn/mmopen/3wf56PCHtum1CvU0WZ4C5txQBibe3b1WylQnDZHQcnZkDeibZzldMh5ejVje4RESCRRj8SrHVicMpSiaVWdRlvlYliaYKcfvpy5AC/132'

const TabContent = ({ tabsData, item, currentData = {} }) => {
  let renderContent = null
  if (tabsData.tabsType === 'twlj') {
    renderContent = (
      <div className={`twlj ${item.value}`}>
        <div className='pic'>
          <img src={(currentData.main_img[0] && (currentData.main_img[0].url || currentData.main_img[0].thumbUrl)) || LOGO} alt='标题图' />
        </div>
        <div className='text'>
          <div className='title'>{currentData.title || '标题'}</div>
          <div className='desc'>{currentData.desc || '描述...'}</div>
        </div>
      </div>
    )
  }
  return renderContent
}


export default class Tab extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.value
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      activeKey: nextProps.value
    })
  }

  handleChange = value => {
    this.setState({
      activeKey: value
    }, () => {
      this.handleFormValue(value)
    })
  }

  handleFormValue = value => {
    const { onChange, disabled } = this.props
    if (!disabled && onChange) {
      onChange(value)
    }
  }

  render() {
    const { itemInfo, form } = this.props
    const { activeKey } = this.state
    console.log(activeKey)
    return (
      <Tabs type='card' activeKey={activeKey} onChange={this.handleChange}>
        {itemInfo.dataSource.map(item => (
          <Tabs.TabPane
            tab={<span>{item.label}
              {
                form.getFieldValue(`${itemInfo.key}`) === item.value && (
                  <Icon style={{ paddingLeft: 5 }} type='check' />
                )
              }</span>}
            key={item.value} style={{ padding: '5px 10px 20px 5px' }}>
            <TabContent
              tabsData={itemInfo}
              item={item}
              currentData={{
                ...form.getFieldsValue()
              }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    )
  }
}

