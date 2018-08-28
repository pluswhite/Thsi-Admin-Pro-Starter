import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { Form, Input, Button, message, Select, Switch, Row, Col, Spin, Steps, Radio, DatePicker } from 'antd'
import './info.scss'
import moment from 'moment'
import 'moment/locale/zh-cn'
import TemplateContent from './TemplateContent'

const FormItem = Form.Item
const Option = Select.Option
const Step = Steps.Step
const stepInfo = [
  {
    title: '选择活动类型',
    desc: '不同活动类型有不同的营销目的'
  },
  {
    title: '活动内容设置',
    desc: '填写活动具体内容'
  },
  {
    title: '活动展示设置',
    desc: '设置活动展示控制'
  }
]

const formItemLayout = {
  // labelCol: { span: 4 },
  // wrapperCol: { span: 16, offset: 1 }
  wrapperCol: {
    span: 20
  }
}

export default Form.create(
  {
    mapPropsToFields: props => {
      const { type, activityInfo, activityTypeList } = props
      if (type === 'edit') {
        return {
          type: Form.createFormField({
            value: activityInfo && activityInfo.type
          })
        }
      }
      return {
        type: Form.createFormField({
          value: activityTypeList[0] && activityTypeList[0].value
        }),
      }
    }
  }
)(class ActInfo extends Component {
  static propTypes = {
    // prop: PropTypes
    type: PropTypes.string.isRequired,
    product: PropTypes.object,
    form: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    reload: PropTypes.func,
    activityInfo: PropTypes.object,
    resetActivityInfo: PropTypes.func,
    fetchTypeInfo: PropTypes.func.isRequired,
    fetchPublishUsers: PropTypes.func.isRequired,
    fetchPublishTags: PropTypes.func.isRequired,
    activityTypeList: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    toEdit: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
      actTypeContent: {
        content: []
      },
      isListUnlimited: true,
      usersData: [],
      tagsData: [],
      usersValue: [],
      tagsValue: [],
      fetching: false,
      showUserTagError: false
    }
    this._actData = {}
    this._flag = true
    this._validStep = 0
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {
    const { form } = this.props
    const typeValue = form.getFieldValue('type')
    typeValue && this.handleTypeChange(typeValue)
  }

  componentWillReceiveProps = (nextProps) => {
    // 数据初始化处理
    const { type, activityInfo } = nextProps
    if (type === 'edit' && this._flag && activityInfo.type) {
      this.formatData(activityInfo)
    }
  }

  componentWillUnmount = () => {
    const { resetActivityInfo } = this.props
    resetActivityInfo && resetActivityInfo()
  }

  formatData = (activityInfo, cb) => {
    // 获取模板信息
    this.handleTypeChange(activityInfo.type)

    // 格式化数据
    let actData = Object.assign({}, activityInfo)

    actData.date_range = [
      moment(actData.start),
      moment(actData.stop)
    ]
    delete actData.start
    delete actData.stop

    const _bw = actData.is_black_or_white

    // 白名单为1， checked
    actData.is_black_or_white = _bw === '1'

    this._actData = actData
    this._flag = false
    this._validStep = stepInfo.length - 1
    console.log(this._actData)

    this.setState({
      isListUnlimited: _bw === '2' && actData.users_list.length === 0 && actData.tags_list.length === 0
    }, () => {
      cb && cb()
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { isListUnlimited, currentStep } = this.state
    const { form, submit } = this.props

    // 当前form value
    let currentFormValue = {}
    let noError = true
    form.validateFields((err, values) => {
      if (!err) {
        // 白空下标签列表和用户列表至少一项不为空
        if (
          !isListUnlimited &&
          values.is_black_or_white &&
          values.tags_list.length === 0 &&
          values.users_list.length === 0
        ) {
          this.setState(
            {
              showUserTagError: true
            },
            () => {
              form.validateFields(['tags_list', 'users_list'], { force: true })
            }
          )
          noError = false
        }
        currentFormValue = values
      } else {
        noError = false
      }
    })

    if (!noError) {
      return
    }

    // template data
    let content = this._actData.content
    if (this._template) {
      let template_data_has_err = false
      this._template.props.form.validateFields((err, values) => {
        if (!err) {
          content = this.handleTemplateData()
        } else {
          template_data_has_err = true
        }
      })

      if (template_data_has_err) {
        // this._validStep = currentStep
        return
      }
    }

    const data = {
      ...this._actData,
      ...currentFormValue,
      content
    }

    const [start, stop] = [data.date_range[0].format('YYYY-MM-DD HH:mm:ss'), data.date_range[1].format('YYYY-MM-DD HH:mm:ss')]
    delete data.date_range

    submit(
      {
        ...data,
        // 默认为黑空-2，即不限制任何用户
        is_black_or_white: isListUnlimited ? '2' : data.is_black_or_white ? '1' : '2',
        start,
        stop,
        tags_list: isListUnlimited ? [] : data.tags_list.map(item => item.key),
        users_list: isListUnlimited ? [] : data.users_list.map(item => item.key)
      },
      msg => {
        message.success(msg, 2)
      },
      msg => {
        message.error(msg)
      }
    )
  }

  handleTypeChange = type => {
    console.log(type)
    this.props.fetchTypeInfo({
      type
    }, data => {
      this.setState({
        actTypeContent: data
      })
    }, fail => {
      message.error('类型获取失败！')
    })
  }

  handleGoto = (validate, nextStep) => {
    // const { currentStep } = this.state
    if (validate) {
      // 下一步需要验证值合法性
      const { form } = this.props
      form.validateFields((err, values) => {
        // this.props.updatePublish(values)
        if (!err) {
          this.handleCurrentFormData(validate, nextStep)
        } else {
          // this._validStep = currentStep
        }
      })
    } else {
      this.handleCurrentFormData(validate, nextStep)
    }
  }

  handleCurrentFormData = (validate, nextStep) => {
    const { form } = this.props
    // const { currentStep } = this.state
    let validStep = this._validStep
    let content = {}
    let template_data_has_err = false
    if (this._template) {
      if (!validate) {
        content = this.handleTemplateData()
      } else {
        this._template.props.form.validateFields((err, values) => {
          if (!err) {
            content = this.handleTemplateData()
          } else {
            template_data_has_err = true
          }
        })
      }
    }

    if (template_data_has_err) {
      // this._validStep = currentStep
      return
    }

    this._validStep = validStep > nextStep ? validStep : nextStep

    this._actData = {
      ...this._actData,
      ...form.getFieldsValue(),
      content: {
        ...this._actData.content,
        ...content
      }
    }

    this.setDataToCurrentFields(nextStep)
  }

  /**
   * 处理模板值
   */
  handleTemplateData = () => {
    let content = this._template.props.form.getFieldsValue()
    for (let key in content) {
      // 处理文件上传
      if (content[key] instanceof Array && content[key][0] && content[key][0].thumbUrl) {
        content[key] = this._template._uploadData[key]
      }
    }
    return content
  }

  setDataToCurrentFields = nextStep => {
    const { form } = this.props
    this.setState({
      currentStep: nextStep
    }, () => {
      let currentFormFields = { ...form.getFieldsValue() }
      for (let key in currentFormFields) {
        currentFormFields[key] = this._actData[key] !== undefined ? this._actData[key] : currentFormFields[key]
      }
      form.setFieldsValue(currentFormFields)
      if (this._template) {
        this._template.props.form.setFieldsValue(this._actData.content || {})
      }
    })
  }

  fetchUsers = value => {
    this.setState({
      usersData: [],
      fetching: true
    })

    this.props.fetchPublishUsers(
      {
        searchStr: value
      },
      usersData => {
        // console.log(usersData)
        this.setState({
          usersData,
          fetching: false
        })
      },
      msg => {
        message.error(msg)
      }
    )
  }

  handleUsersChange = usersValue => {
    this.setState({
      usersValue,
      usersData: [],
      fetching: false
    })
    this.validateFormFields()
  }

  fetchTags = value => {
    this.setState({
      usersData: [],
      fetching: true
    })

    this.props.fetchPublishTags(
      {
        searchStr: value
      },
      tagsData => {
        // console.log(tagsData)
        this.setState({
          tagsData,
          fetching: false
        })
      },
      msg => {
        message.error(msg)
      }
    )
  }

  handleTagsChange = tagsValue => {
    this.setState({
      tagsValue,
      tagsData: [],
      fetching: false
    })
    this.validateFormFields()
  }

  handleListChange = checked => {
    // console.log(checked)
    this.setState({
      isListUnlimited: !checked
    })
    this.validateFormFields()
  }

  validateFormFields = () => {
    const { form } = this.props
    this.setState(
      {
        showUserTagError: false
      },
      () => {
        form.validateFields(['tags_list', 'users_list'], { force: true })
      }
    )
  }

  addClickEvent = (step, text) => {
    const { currentStep } = this.state
    const { disabled } = this.props
    const validStep = this._validStep
    return (
      <span
        style={{
          cursor: step <= validStep ? 'pointer' : 'default'
        }}
        onClick={() => {
          this.handleGoto(!disabled, step <= validStep ? step : currentStep)
        }}
      >{text}</span>
    )
  }

  render() {
    const { type, disabled, form, activityTypeList, activityInfo, toEdit } = this.props
    const {
      currentStep,
      actTypeContent,
      isListUnlimited,
      usersValue,
      usersData,
      tagsData,
      tagsValue,
      fetching,
      showUserTagError
    } = this.state
    const { getFieldDecorator } = form

    // 新增时只显示已开启的模板
    // 编辑时显示已开启模板和与自身value相同的模板
    let _act_type_list = []
    if (type === 'edit') {
      _act_type_list = activityTypeList.filter(item => (item.status === '1' || activityInfo.type === item.value))
    } else {
      _act_type_list = activityTypeList.filter(item => item.status === '1')
    }

    return (
      <div className='act-info'>
        <Steps current={currentStep}>
          {
            stepInfo.map((info, step) => (
              <Step
                key={info.title}
                title={this.addClickEvent(step, info.title)}
                description={this.addClickEvent(step, info.desc)}
              />
            ))
          }
        </Steps>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          {currentStep === 0 && (
            <fieldset>
              <legend>活动类型</legend>
              <Row gutter={24}>
                <Col xxl={6} xl={8} sm={12} xs={24}>
                  <FormItem label='请选择活动类型' {...formItemLayout}>
                    {getFieldDecorator('type', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择活动类型'
                        }
                      ]
                    })(
                      <Radio.Group disabled={type === 'edit' ? true : disabled} onChange={e => this.handleTypeChange(e.target.value)}>
                        {_act_type_list.map(item => (
                          <Radio key={item.value} value={item.value}
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              margin: 10
                            }}
                          >{item.label}</Radio>
                        ))}
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} xs={24}>
                  <div className='title'>
                    {actTypeContent.title}
                  </div>
                  <br />
                  <div className='desc'>
                    {actTypeContent.desc}
                  </div>
                  <br />
                  <img src={actTypeContent.image} alt='概览图' />
                </Col>
              </Row>
            </fieldset>
          )}
          {currentStep === 1 && (
            <div>
              <fieldset>
                <legend>基础信息</legend>
                <Row>
                  <Col xxl={6} xl={8} sm={12} xs={24}>
                    <FormItem label='备注名称' {...formItemLayout}>
                      {getFieldDecorator('title', {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: '请备注活动名称',
                            // type: 'url'
                          }
                        ]
                      })(<Input disabled={disabled} placeholder='请备注活动名称' />)}
                    </FormItem>
                  </Col>
                  <Col xl={16} xs={24}>
                    <FormItem label='备注描述' {...formItemLayout}>
                      {getFieldDecorator('desc', {
                        initialValue: '',
                        rules: [
                          {
                            // required: true,
                            message: '请备注活动描述',
                            // type: 'url
                          }
                        ]
                      })(<Input.TextArea disabled={disabled} placeholder='请备注活动描述' />)}
                    </FormItem>
                  </Col>
                </Row>
              </fieldset>
              <fieldset>
                <legend>活动内容{actTypeContent.title && `[${actTypeContent.title}]`}</legend>
                <TemplateContent
                  disabled={disabled}
                  template={actTypeContent.content}
                  wrappedComponentRef={el => (this._template = el)}
                />
              </fieldset>
            </div>

          )}
          {currentStep === 2 && (
            <div>
              <fieldset>
                <legend>展示时间</legend>
                <Row>
                  <Col xxl={6} xl={8} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label='时间范围'>
                      {getFieldDecorator('date_range', {
                        initialValue: [],
                        rules: [
                          {
                            required: true,
                            message: '请选择发布时间范围'
                          }
                        ]
                      })(
                        <DatePicker.RangePicker
                          style={{
                            width: '100%'
                          }}
                          disabled={disabled}
                          disabledDate={current => {
                            return (
                              current &&
                              current.valueOf() <=
                              moment()
                                .subtract(1, 'day')
                                .valueOf()
                            )
                          }}
                          showTime={{ format: 'HH:mm:ss' }}
                          format='YYYY/MM/DD HH:mm:ss'
                        // getCalendarContainer={() => this._form_layout}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </fieldset>
              <fieldset>
                <legend>用户范围</legend>
                <Row gutter={24}>
                  <Col xxl={6} xl={8} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label='范围设置' extra='设置为无限制则默认为全部用户'>
                      <Switch
                        disabled={disabled}
                        checked={!isListUnlimited}
                        onChange={this.handleListChange}
                        checkedChildren='特定范围'
                        unCheckedChildren='无限制'
                      />
                    </FormItem>
                  </Col>
                </Row>
                {/* {!isListUnlimited && ( */}
                <Row gutter={24} style={{
                  display: isListUnlimited ? 'none' : 'block'
                }}>
                  <Col xxl={8} xl={8} sm={12} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label='黑白名单'
                      extra={
                        <div>
                          <p className='mb0'>黑白名单设置会影响到下面设置的目标人群；</p>
                          <p className='mb0'>如果设置为空的黑名单则选择为全部用户，等同于无限制；</p>
                          <p className='mb0 text-danger'>不可设置为空的白名单，标签列表或用户列表至少选填一项</p>
                        </div>
                      }
                    >
                      {getFieldDecorator('is_black_or_white', {
                        initialValue: true,
                        valuePropName: 'checked',
                        rules: [
                          {
                            required: true,
                            message: '黑白名单为必填项'
                          }
                        ]
                      })(
                        <Switch
                          disabled={disabled}
                          checkedChildren='白名单'
                          unCheckedChildren='黑名单'
                          onChange={this.validateFormFields}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col xxl={8} xl={8} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label='标签列表'>
                      {getFieldDecorator('tags_list', {
                        initialValue: tagsValue,
                        rules: [
                          {
                            required: showUserTagError,
                            message: '请选择发布目标人群标签'
                          }
                        ]
                      })(
                        <Select
                          disabled={disabled}
                          mode='multiple'
                          labelInValue
                          placeholder='选择标签'
                          notFoundContent={fetching ? <Spin size='small' /> : null}
                          filterOption={false}
                          onSearch={this.fetchTags}
                          onChange={this.handleTagsChange}
                          style={{ width: '100%' }}
                        >
                          {tagsData.map(d => <Option key={d.key}>{d.label}</Option>)}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col xxl={8} xl={8} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label='用户列表'>
                      {getFieldDecorator('users_list', {
                        initialValue: usersValue,
                        rules: [
                          {
                            required: showUserTagError,
                            message: '请选择发布目标人群列表'
                          }
                        ]
                      })(
                        <Select
                          disabled={disabled}
                          mode='multiple'
                          labelInValue
                          placeholder='选择用户'
                          notFoundContent={fetching ? <Spin size='small' /> : null}
                          filterOption={false}
                          onSearch={this.fetchUsers}
                          onChange={this.handleUsersChange}
                          style={{ width: '100%' }}
                        >
                          {usersData.map(d => <Option key={d.key}>{d.label}</Option>)}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </fieldset>
            </div>
          )}
          <fieldset style={{ marginTop: 10 }}>
            <legend />
            <FormItem
              colon={false}
              label=' '
              // {...formItemLayout}
              style={{
                textAlign: 'right'
              }}>
              {currentStep > 0 && (
                <Button
                  style={{
                    marginRight: currentStep === stepInfo.length - 1 ? 0 : 10
                  }}
                  onClick={() => this.handleGoto(false, currentStep - 1)}
                >上一步</Button>
              )}
              {currentStep < 2 && (
                <Button
                  type='primary'
                  onClick={() => this.handleGoto(!disabled, currentStep + 1)}
                >下一步</Button>
              )}
              {/* 第二步起可以编辑活动 */}
              {disabled && currentStep > 0 && (
                <Button type='primary' onClick={toEdit}
                  style={{
                    marginLeft: 10
                  }}>
                  编辑
                </Button>
              )}
              {!disabled && type === 'edit' && (
                <Button onClick={() => toEdit('cancel')}
                  style={{
                    marginLeft: 10
                  }}>
                  取消
                </Button>
              )}
              {currentStep > 0 && !disabled && type === 'edit' && (
                <Button type='primary' htmlType='submit'
                  style={{
                    marginLeft: 10
                  }}>
                  更新
                </Button>
              )}
              {currentStep === 2 && type !== 'edit' && (
                <Button type='primary' htmlType='submit' style={{ marginLeft: 10 }}>
                  创建
                </Button>
              )}
              {disabled && (
                <Button onClick={() => { browserHistory.goBack() }} style={{ marginLeft: 10 }}>
                  返回
              </Button>
              )}
            </FormItem>
          </fieldset>
        </Form>
      </div >
    )
  }
})
