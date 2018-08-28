import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'
import { Card, Button, Spin } from 'antd'

const getDisplayName = component => {
  return component.displayName || component.name || 'Component'
}

const DateRange = ({ date }) => {
  let renderData = ''
  if(date && date.length) {
    renderData = `（${date[0]} ~ ${date[date.length-1]}）`
  }
  return renderData
}

export default target => WrappedComponent =>
  class HOC extends Component {
    static propTypes = {
      handleFetch: PropTypes.func.isRequired,
      target: PropTypes.object.isRequired
    }
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    constructor (props) {
      super(props)
      this.state = {
        visibilityActive: true,
        isLoading: false
      }
    }

    /**
     * 滚动到当前视口的处理事件
     * 当第一次滚动到视口，且之前未成功获取过数据时触发
     */
    handleChange = isVisible => {
      isVisible && this.fetchData()
    }

    fetchData = () => {
      this.setState({
        isLoading: true,
        visibilityActive: false
      })
      const { handleFetch, target } = this.props
      const params = {}
      handleFetch(
        target,
        params,
        success => {
          this.setState({
            isLoading: false
          })
        },
        fail => {
          this.setState({
            isLoading: false
          })
          // 10s后重置，以便再取数据
          setTimeout(() => {
            this.setState({
              visibilityActive: true
            })
          }, 10000)
        }
      )
    }

    render () {
      const { target, data } = this.props
      const { visibilityActive, isLoading } = this.state
      const { title, icon } = target
      return (
        <Card
          title={
            <span title={title}>
              <img src={icon} />
              {title}
              <DateRange date={data.date} />
            </span>
          }
          extra={<Button type='default' shape='circle' icon='reload' title='刷新' onClick={this.fetchData} />}
        >
          {/* 下滚 */}
          <VisibilitySensor active={visibilityActive} onChange={this.handleChange} />
          <Spin spinning={isLoading} tip='努力加载中...'>
            <WrappedComponent {...this.props} />
          </Spin>
          {/* 上滚 */}
          <VisibilitySensor active={visibilityActive} onChange={this.handleChange} />
        </Card>
      )
    }
  }
