import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import apiConfig from 'vcfg/apiConfig'
import {
  requestAuthInstance
} from 'vstore/auth'
import store from 'store'
import { message } from 'antd'
import './RichText.scss'

const UPLOAD_URL = apiConfig.apiBaseUrl + '/file/add'

const uploadHandler = (successCallback, failureCallback) => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()
  input.onchange = () => {
    const file = input.files[0]
    let fd = new FormData()
    fd.append('files', file)
    // console.log('User trying to uplaod this:', file)
    requestAuthInstance.post(UPLOAD_URL, fd, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          successCallback && successCallback(res.data.data.src || '')
        } else {
          failureCallback && failureCallback()
        }
      })
      .catch(err => {
        failureCallback && failureCallback()
        console.log(err)
      })
  }
}

export default class RichText extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
    this.quillRef = null      // Quill instance
    this.reactQuillRef = null // ReactQuill component
  }

  componentDidMount = () => {
    this.attachQuillRefs()
  }

  componentDidUpdate = () => {
    this.attachQuillRefs()
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: nextProps.value
    })
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  modules = {
    toolbar: {
      container: [
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ align: [] },
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { direction: 'rtl' }
        ],
        ['link', 'image', 'video'],
        ['emoji'],
        ['clean']
      ],
      handlers: {
        image: () => uploadHandler(
          link => {
            const range = this.quillRef.getSelection()
            // console.log(range)
            this.quillRef.insertEmbed(range.index, 'image', link)
          },
          fail => {
            message.error('上传失败！')
          }
        )
      }
    }
  }

  handleChange = (content, delta, source, editor) => {
    // console.log(content, delta, source, editor)
    const { onChange } = this.props
    this.setState({ value: content }, () => {
      if (onChange) {
        onChange(content)
      }
    })
  }

  render() {
    const { value } = this.state
    const { placeholder, disabled } = this.props
    return (
      <ReactQuill
        theme='snow'
        modules={this.modules}
        // formats={formats}
        value={value}
        onChange={this.handleChange}
        placeholder={placeholder}
        readOnly={disabled}
        ref={(el) => { this.reactQuillRef = el }}
      />
    )
  }
}
