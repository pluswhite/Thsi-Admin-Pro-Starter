import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { browserHistory } from 'react-router'
import {
  Row,
  Col,
  Card,
  Icon,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Checkbox,
  // Upload,
  InputNumber,
  Switch,
  AutoComplete,
  Cascader,
  Spin,
  message
} from 'antd'
// import {
//   requestUploadUrl
// } from 'vstore/auth'

import './EditCampaign.scss'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { TextArea } = Input

const options = [
  { label: '静态图片', value: '1' },
  { label: '动态图片', value: '2' },
  { label: 'SWF', value: '3' },
  { label: 'TXT', value: '4' },
]

class EditCampaign extends Component {
  static propTypes = {
    guid: PropTypes.string,
    form: PropTypes.object,
    isLoading: PropTypes.bool,
    adspaceBaseInfo: PropTypes.object,
    bannerInfo: PropTypes.object,
    updateEditCampaign: PropTypes.func,
    fetchBannerAdsItemInfo: PropTypes.func
  }

  constructor (props) {
    super(props)
    const {
      bannerInfo
    } = props
    this.state = {
      'guid': props.guid,
      ...bannerInfo,
      hasInit: 0
    }
  }

  componentDidMount = () => {
    const { guid } = this.state
    this.props.fetchBannerAdsItemInfo({
      guid: guid,
      type: 'banner',
      rnd: (new Date()).getTime()
    })
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log(this.state.hasInit)
    const { hasInit } = this.state
    if (hasInit >= 2) {
      return
    }
    const {
      bannerInfo
    } = nextProps
    this.setState({
      ...bannerInfo,
      hasInit: hasInit + 1
    })
  }

  handleSubmit = (evt) => {
    const { guid } = this.props
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        values.guid = guid
        this.props.updateEditCampaign(values, () => {
          message.success('添加成功', () => {
            console.log('3秒后跳转')
          })
        }, () => {
          message.error('抱歉，出错了。')
        })
      }
    })
  }

  // normFile = (e) => {
  //   console.log('Upload event:', e)
  //   if (Array.isArray(e)) {
  //     return e
  //   }
  //   return e && e.fileList
  // }

  onAdspacePhlumFormSizeChange = (value, selectedOptions) => {
    // console.log(value)
    this.setState({
      adspacePhylumFormSize: value
    })
  }

  onCpeSuppoertChange = (evt) => {
    // console.log(evt.target.value)
    this.setState({
      cpeSupport: evt.target.value
    })
  }

  onContainerChange = (evt) => {
    // console.log(evt.target.value)
    this.setState({
      container: evt.target.value
    })
  }

  // onSetTypeChange = (evt) => {
  //   // console.log(evt.target.value)
  //   this.setState({
  //     setType: evt.target.value
  //   })
  // }

  render () {
    const {
      form,
      isLoading,
      adspaceBaseInfo,
    } = this.props

    const { getFieldDecorator } = form

    const {
      sellerListOptions,
      adspacePhylumFormSizeOptions,
      pageCategoryOptions
    } = adspaceBaseInfo

    const {
      sellerName,
      adspaceName,
      formatList,
      adspacePhylumFormSize,
      closeType,
      popType,
      adspaceWidth,
      adspaceHeight,
      position,
      container,
      pageUrl,
      pageCategory,
      cpeSupport,
      cpeFormatList,
      cpeMode,
      cpeSizeId,
      cpeDuration,
      adspacePageUrl,
      basePrice,
      auditType,
      antiSunroofCode
    } = this.state

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }

    const innerFormItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }

    const switchFormItemLayout = {
      labelCol: {
        span: 15
      },
      wrapperCol: {
        span: 9
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }

    return (
      <div className='banner-edit-wrapper'>
        <Helmet>
          <title>编辑广告位</title>
        </Helmet>
        <h2 className='page-title'>
          展示类广告位
          <small>编辑</small>
        </h2>
        <Card
          title={<span><Icon type='plus' /> 编辑广告位</span>}
          noHovering
          extra={<Button type='default' shape='circle' icon='rollback' title='返回列表' onClick={() => browserHistory.push('/admin/adspace/banner/list')} />}
          bordered={false}
        >
          <Row>
            <Col span={6} />
            <Col span={12}>
              <Spin spinning={isLoading}>
                <Form onSubmit={this.handleSubmit}>
                  <fieldset>
                    <legend>广告位信息</legend>
                    <FormItem
                      {...formItemLayout}
                      label='所属用户'>
                      {getFieldDecorator('seller_name', {
                        initialValue: sellerName,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your owner name!'
                          }
                        ]
                      })(
                        <AutoComplete
                          dataSource={sellerListOptions}
                          placeholder='请选择所属用户'
                        />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='广告位名称'>
                      {getFieldDecorator('adspace_name', {
                        initialValue: adspaceName,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your adspace name!'
                          }
                        ]
                      })(
                        <Input placeholder='广告位名称' />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='允许广告形式'>
                      {getFieldDecorator('format_list', {
                        initialValue: formatList,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your adspace format!'
                          }
                        ]
                      })(
                        <CheckboxGroup options={options} />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='广告位类型'>
                      {getFieldDecorator('adspace_phylum_form_size', {
                        initialValue: adspacePhylumFormSize,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your adspace format!'
                          }
                        ]
                      })(
                        <Cascader
                          options={adspacePhylumFormSizeOptions}
                          onChange={this.onAdspacePhlumFormSizeChange}
                          placeholder='请选择广告位类型' />
                      )}
                    </FormItem>
                    {adspacePhylumFormSize[0] === 'PC 弹窗广告' &&
                      <FormItem
                        {...formItemLayout}
                        label='广告位要求'>
                        <Col span={11}>
                          <FormItem
                            {...switchFormItemLayout}
                            label='关闭按钮控制要求'>
                            {getFieldDecorator('close_type', {
                              initialValue: closeType,
                              valuePropName: 'checked'
                            })(
                              <Switch checkedChildren='媒体' unCheckedChildren='VAM' />
                            )}
                          </FormItem>
                        </Col>
                        <Col span={2}>
                          <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }} />
                        </Col>
                        <Col span={11}>
                          <FormItem
                            {...switchFormItemLayout}
                            label='位置控制要求'>
                            {getFieldDecorator('pop_type', {
                              initialValue: popType,
                              valuePropName: 'checked'
                            })(
                              <Switch checkedChildren='媒体' unCheckedChildren='VAM' />
                            )}
                          </FormItem>
                        </Col>
                      </FormItem>
                    }
                    <FormItem
                      {...formItemLayout}
                      label='广告位尺寸'>
                      <Col span={11}>
                        <FormItem
                          {...innerFormItemLayout}
                          label='宽'
                        >
                          {getFieldDecorator('adspace_width', {
                            initialValue: adspaceWidth,
                            rules: [
                              {
                                required: true,
                                message: 'Please input your adspace size width!'
                              }
                            ]
                          })(
                            <InputNumber placeholder='宽' />
                          )}
                          <span className='ant-form-text'> px</span>
                        </FormItem>
                      </Col>
                      <Col span={2}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                          x
                        </span>
                      </Col>
                      <Col span={11}>
                        <FormItem
                          {...innerFormItemLayout}
                          label='高'
                        >
                          {getFieldDecorator('adspace_height', {
                            initialValue: adspaceHeight,
                            rules: [
                              {
                                required: true,
                                message: 'Please input your adspace height!'
                              }
                            ]
                          })(
                            <InputNumber placeholder='高' />
                          )}
                          <span className='ant-form-text'> px</span>
                        </FormItem>
                      </Col>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='广告位位置'
                      >
                      {getFieldDecorator('position', {
                        initialValue: position,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your adspace position!'
                          }
                        ]
                      })(
                        <Select placeholder='请选择广告位位置'>
                          <Option value='1'>第一屏</Option>
                          <Option value='2'>第二屏</Option>
                          <Option value='3'>第三屏</Option>
                          <Option value='4'>其它屏</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='广告位容器类型'>
                      {getFieldDecorator('container', {
                        initialValue: container
                      })(
                        <RadioGroup onChange={this.onContainerChange}>
                          <Radio value='1'>DIV容器</Radio>
                          <Radio value='2'>IFRAME容器</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    {container === '2' &&
                      <FormItem
                        {...formItemLayout}
                        label='页面URL'>
                        {getFieldDecorator('page_url', {
                          initialValue: pageUrl,
                          rules: [
                            {
                              required: true,
                              message: 'Please input your page url!'
                            }
                          ]
                        })(
                          <Input placeholder='广告位所在页面URL' />
                        )}
                      </FormItem>
                    }
                    <FormItem
                      {...formItemLayout}
                      label='页面内容分类'>
                      {getFieldDecorator('page_category', {
                        initialValue: pageCategory,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your page category!'
                          }
                        ]
                      })(
                        <Cascader
                          options={pageCategoryOptions}
                          placeholder='请选择页面内容分类' />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='是否支持富媒体'>
                      {getFieldDecorator('cpe_support', {
                        initialValue: cpeSupport
                      })(
                        <RadioGroup onChange={this.onCpeSuppoertChange}>
                          <Radio value='yes'>是</Radio>
                          <Radio value='no'>否</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    {cpeSupport === 'yes' &&
                      <FormItem
                        {...formItemLayout}
                        label='允许广告形式'>
                        {getFieldDecorator('cpe_format_list', {
                          initialValue: cpeFormatList,
                          rules: [
                            {
                              required: true,
                              message: 'Please select video format!'
                            }
                          ]
                        })(
                          <CheckboxGroup options={[
                            {
                              label: 'MP4',
                              value: '6'
                            },
                            {
                              label: 'FLV',
                              value: '5'
                            },
                            {
                              label: 'OGV',
                              value: '7'
                            },
                            {
                              label: 'WEBM',
                              value: '8'
                            }
                          ]} />
                        )}
                      </FormItem>
                    }
                    {cpeSupport === 'yes' &&
                      <FormItem
                        {...formItemLayout}
                        label='触发方式'>
                        {getFieldDecorator('cpe_mode', {
                          initialValue: cpeMode,
                          rules: [
                            {
                              required: true
                            }
                          ]
                        })(
                          <RadioGroup>
                            <Radio value='1'>自动触发</Radio>
                          </RadioGroup>
                        )}
                      </FormItem>
                    }
                    {cpeSupport === 'yes' &&
                      <FormItem
                        {...formItemLayout}
                        label='广告位尺寸'>
                        {getFieldDecorator('cpe_size_id', {
                          initialValue: cpeSizeId,
                          rules: [
                            {
                              required: true
                            }
                          ]
                        })(
                          <RadioGroup>
                            <Radio value='29'>640*360</Radio>
                          </RadioGroup>
                        )}
                      </FormItem>
                    }
                    {cpeSupport === 'yes' &&
                      <FormItem
                        {...formItemLayout}
                        label='视频最大时长'>
                        {getFieldDecorator('cpe_duration', {
                          initialValue: cpeDuration,
                          rules: [
                            {
                              required: true
                            }
                          ]
                        })(
                          <RadioGroup>
                            <Radio value='15'>15s</Radio>
                          </RadioGroup>
                        )}
                      </FormItem>
                    }
                    {/* <FormItem
                      {...formItemLayout}
                      label='广告位示例图'>
                      {getFieldDecorator('image_id', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        initialValue: imageId
                      })(
                        <Upload
                          name='image_id'
                          action={`${requestUploadUrl}?rnd=${(new Date()).getTime()}`}
                          listType='picture'>
                          <Button>
                            <Icon type='upload' /> 点击上传图片
                          </Button>
                        </Upload>
                      )}
                    </FormItem> */}
                    <FormItem
                      {...formItemLayout}
                      label='广告位示例URL'>
                      {getFieldDecorator('adspace_page_url', {
                        initialValue: adspacePageUrl
                      })(
                        <Input placeholder='广告位示例URL' />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='底价'>
                      {getFieldDecorator('base_price', {
                        initialValue: basePrice,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your base price!'
                          }
                        ]
                      })(
                        <InputNumber step={0.01} placeholder='0.01' min={0.01} />
                      )}
                      <span className='ant-form-text'> ￥/CPM</span>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='投放审核要求'>
                      {getFieldDecorator('audit_type', {
                        initialValue: auditType
                      })(
                        <RadioGroup>
                          <Radio value='1'>先投放，后审核</Radio>
                          <Radio value='0'>先审核，后投放</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label='打底广告'>
                      {getFieldDecorator('anti_sunroof_code', {
                        initialValue: antiSunroofCode
                      })(
                        <TextArea rows={6} placeholder='请填写打底广告代码。' />
                      )}
                    </FormItem>
                    {/* <FormItem
                      {...formItemLayout}
                      label='广告过滤设置'>
                      {getFieldDecorator('set_type', {
                        initialValue: setType
                      })(
                        <RadioGroup onChange={this.onSetTypeChange}>
                          <Radio value='1'>使用账户设置</Radio>
                          <Radio value='2'>使用广告位个性化设置</Radio>
                        </RadioGroup>
                      )}
                    </FormItem> */}
                  </fieldset>
                  <fieldset>
                    <legend />
                    <FormItem {...tailFormItemLayout}>
                      <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>保存</Button>
                      <Button onClick={() => browserHistory.push('/admin/adspace/banner/list')}>取消</Button>
                    </FormItem>
                  </fieldset>
                </Form>
              </Spin>
            </Col>
            <Col span={6} />
          </Row>
        </Card>
      </div>
    )
  }
}

const EditCampaignWrapper = Form.create()(EditCampaign)

export default EditCampaignWrapper
