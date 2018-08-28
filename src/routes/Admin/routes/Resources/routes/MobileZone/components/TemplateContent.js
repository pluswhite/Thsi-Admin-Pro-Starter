import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from 'store'
import apiConfig from 'vcfg/apiConfig'
import { Form, Row, Col, Select, Input, Switch, Upload, Icon, Modal, message, AutoComplete, InputNumber } from 'antd'
import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'
import Tab from './utils/Tab'
import TagsEdit from './utils/TagsEdit'
import RichText from './utils/RichText'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  // labelCol: { span: 4 },
  // wrapperCol: { span: 16, offset: 1 }
  wrapperCol: {
    span: 20
  }
}

const fetchSizeList = success => {
  return requestAuthInstance.get(ApiList.Resources.CPCListInfo, {
    headers: {
      'Authorization': store.get('access_token') || null,
      'User-Id': store.get('user_id') || null
    },
    params: {
      'rnd': (new Date()).getTime()
    }
  })
    .then(res => {
      if (res.data.status === 'success') {
        success(res.data.data.sizeList || [])
      }
    })
}

// const fetchSalerList = success => {
//   return requestAuthInstance.get(ApiList.Resources.salerList, {
//     headers: {
//       'Authorization': store.get('access_token') || null,
//       'User-Id': store.get('user_id') || null
//     },
//     params: {
//       'rnd': (new Date()).getTime()
//     }
//   })
//     .then(res => {
//       if (res.data.status === 'success') {
//         success(res.data.data || [])
//       }
//     })
// }

export default Form.create()(class TemplateContent extends Component {
  static propTypes = {
    // prop: PropTypes
    form: PropTypes.object.isRequired,
    template: PropTypes.array.isRequired,
    disabled: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      previewImage: '',
      previewVisible: false,
      dataSource: [],
      // salerList: [],
      tabTitle: '',
    }
    this._initValue = true
    // 上传文件集合
    this._uploadData = {}
  }

  componentWillMount = () => {
    const { template } = this.props
    const { dataSource, salerList } = this.state
    template.map(item => {
      if (item.label === '创意尺寸' && dataSource.length === 0) {
        fetchSizeList(data => {
          this.setState({
            dataSource: data
          })
        })
      }
      // if (item.label === '活动来源' && salerList.length === 0) {
      //   fetchSalerList(data => {
      //     this.setState({
      //       salerList: data
      //     })
      //   })
      // }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this._initValue) {
      const { form } = nextProps
      const values = form.getFieldsValue()
      for (let key in values) {
        // 映射已上传文件
        if (values[key] instanceof Array && values[key][0] && values[key][0].url) {
          this._uploadData[key] = values[key]
        }
      }
      this._initValue = false
    }
  }

  /**
   * 控制上传组件value形式
   *
   */
  normFile = e => {
    // console.log('-----', e.fileList.filter(item => item.status !== 'removed'))
    // if (Array.isArray(e)) {
    //   return e.filter(item => item.status !== 'removed')
    // }
    // return e && e.fileList.filter(item => item.status !== 'removed')

    // 只传一张图
    let currentPic = []
    if (Array.isArray(e)) {
      currentPic.push(e[0])
    } else {
      currentPic.push(e.file)
    }
    return currentPic.filter(item => (item.status !== 'removed' && item.status !== 'error'))
  }

  uploadConfig = itemInfo => {
    return {
      name: 'files',
      multiple: false,
      headers: {
        Authorization: store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      action: apiConfig.apiBaseUrl + itemInfo.action,
      listType: 'picture-card',
      accept: 'image/png, image/jpeg, image/gif',
      onPreview: file => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
        })
      },
      onChange: info => {
        let file = info.file
        // this._uploadData[itemInfo.key] = [file]
        if (file.status === 'done' && file.response) {
          if (file.response.status === 'success') {
            message.info('上传成功', 2)
            const { data } = file.response
            this._uploadData[itemInfo.key] = [{
              uid: data ? data.file_id : Date.now(),
              url: data ? data.src : ''
            }]
          } else {
            file.status = 'error'
            message.error(file.response.msg || '上传失败')
          }
        }
      },
      onRemove: param => {
        if (itemInfo.disabled || this.props.disabled) {
          return false
        }
        message.info('图片已移除', 2)
        this._uploadData[itemInfo.key] = []
        return true
      }
    }
  }

  render() {
    const { previewVisible, previewImage, dataSource } = this.state
    const { template, form, disabled } = this.props
    const { getFieldDecorator } = form

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传</div>
      </div>
    )

    const renderHD = itemInfo => (
      <Col xs={24} key={Math.random()} >
        <legend>{itemInfo.label}</legend>
      </Col>
    )

    const renderBr = () => (
      <Col xs={24} key={Math.random()} />
    )

    const renderInput = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || '',
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || '',
                  type: itemInfo.valueType || 'string'
                }
              ]
            })(
              <Input disabled={itemInfo.disabled || disabled} placeholder={itemInfo.placeholder || ''} />
            )
          }
        </FormItem>
      </Col>
    )

    const renderTextArea = itemInfo => (
      <Col xl={16} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || '',
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || '',
                  type: itemInfo.valueType || 'string'
                }
              ]
            })(
              <Input.TextArea rows={itemInfo.height || 2} disabled={itemInfo.disabled || disabled} placeholder={itemInfo.placeholder || ''} />
            )
          }
        </FormItem>
      </Col>
    )

    const renderSelect = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key}>
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || undefined,
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || '',
                  // type: itemInfo.valueType || ''
                }
              ]
            })(
              <Select disabled={itemInfo.disabled || disabled} placeholder={itemInfo.placeholder}>
                {
                  (itemInfo.dataSource || this.state[itemInfo.dataSourceName] || []).map((item, idx) => (
                    <Option key={item.value}>{item.label}</Option>
                  ))
                }
              </Select>
            )
          }
        </FormItem>
      </Col>
    )

    const renderSwitch = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              valuePropName: 'checked',
              initialValue: itemInfo.value || false,
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || '',
                }
              ]
            })(
              <Switch disabled={itemInfo.disabled || disabled} />
            )
          }
        </FormItem>
      </Col>
    )

    const renderUpload = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              valuePropName: 'fileList',
              initialValue: itemInfo.value || [],
              getValueFromEvent: e => this.normFile(e),
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || '',
                }
              ]
            })(
              <Upload
                disabled={itemInfo.disabled || disabled}
                {...this.uploadConfig(itemInfo)}
              >
                {/* _uploadData中存在当前key且长度不为0说明已有上传文件 */}
                {(this._uploadData[itemInfo.key] && this._uploadData[itemInfo.key].length) ? null : uploadButton}
              </Upload>
            )
          }
        </FormItem>
      </Col>
    )

    const renderAutoComplete = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || '',
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || '',
                  pattern: new RegExp((itemInfo.pattern || '').replace(/\[:bslash:\]/g, '\\'))
                  // pattern: /^\d+\*\d+$/
                }
              ]
            })(
              <AutoComplete dataSource={itemInfo.dataSource || dataSource} disabled={itemInfo.disabled || disabled} placeholder={itemInfo.placeholder || ''} />
            )
          }
        </FormItem>
      </Col>
    )

    const renderInputNumber = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || '',
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || ''
                }
              ]
            })(
              <InputNumber
                disabled={itemInfo.disabled || disabled}
                placeholder={itemInfo.placeholder || ''}
                {...(itemInfo.format === 'rmb' && {
                  formatter: value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: value => value.replace(/￥\s?|(,*)/g, '')
                })}
                {...(itemInfo.format === 'percent' && {
                  formatter: value => `${value}%`,
                  parser: value => value.replace('%', '')
                })}
                precision={2}
                min={0}
                style={{
                  width: '100%'
                }}
              />
            )
          }
        </FormItem>
      </Col>
    )

    const renderTabs = itemInfo => (
      <Col xxl={24} key={itemInfo.key} style={{ clear: 'both' }} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || '',
              // valuePropName: 'activeKey',
            })(
              <Tab
                disabled={itemInfo.disabled || disabled}
                form={form}
                itemInfo={itemInfo}
              />
            )
          }
        </FormItem>
      </Col>
    )

    const renderTagEdit = itemInfo => (
      <Col xxl={6} xl={8} sm={12} xs={24} key={itemInfo.key} >
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || [],
            })(
              <TagsEdit disabled={itemInfo.disabled || disabled} />
            )
          }
        </FormItem>
      </Col>
    )

    const renderRichText = itemInfo => (
      <Col xxl={18} key={itemInfo.key} style={{ clear: 'both' }}>
        <FormItem label={itemInfo.label} extra={itemInfo.extra} {...formItemLayout}>
          {
            getFieldDecorator(`${itemInfo.key}`, {
              initialValue: itemInfo.value || '',
              rules: [
                {
                  required: itemInfo.required,
                  message: itemInfo.message || ''
                }
              ]
            })(
              <RichText
                disabled={itemInfo.disabled || disabled}
                placeholder={itemInfo.placeholder}
              />
            )
          }
        </FormItem>
      </Col>
    )

    let renderTemplate = []

    template.map((itemInfo, itemIdx) => {
      switch (itemInfo.type) {
        case 'hd':
          renderTemplate.push(renderHD(itemInfo))
          break
        case 'br':
          renderTemplate.push(renderBr())
          break
        case 'input':
          renderTemplate.push(renderInput(itemInfo))
          break
        case 'textarea':
          renderTemplate.push(renderTextArea(itemInfo))
          break
        case 'inputNumber':
          renderTemplate.push(renderInputNumber(itemInfo))
          break
        case 'select':
          renderTemplate.push(renderSelect(itemInfo))
          break
        case 'switch':
          renderTemplate.push(renderSwitch(itemInfo))
          break
        case 'upload':
          renderTemplate.push(renderUpload(itemInfo))
          break
        case 'autoComplete':
          renderTemplate.push(renderAutoComplete(itemInfo))
          break
        case 'tabs':
          renderTemplate.push(renderTabs(itemInfo))
          break
        case 'tag_edit':
          renderTemplate.push(renderTagEdit(itemInfo))
          break
        case 'rich_text':
          renderTemplate.push(renderRichText(itemInfo))
          break
        default:
          break
      }
    })

    return (
      <Row>
        {renderTemplate}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => {
            this.setState({
              previewVisible: false
            })
          }}
          bodyStyle={{
            padding: 40
          }}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Row>
    )
  }
})
