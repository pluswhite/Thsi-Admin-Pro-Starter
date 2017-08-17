// import fetch from 'isomorphic-fetch'
import axios from 'axios'
// import { API_SAVE_TEMPLATE_URL, API_GET_ORDER_TEMPLATE_URL, formTypeDetial } from '../../constants'

/**
 * Constants
 */
export const REQUEST_TEMPLATE_POSTS = 'REQUEST_TEMPLATE_POSTS'
export const REQUEST_TEMPLATE_SUCCESS = 'REQUEST_TEMPLATE_SUCCESS'
export const SAVE_TEMPLATE_POSTS = 'SAVE_TEMPLATE_POSTS'
export const SAVE_TEMPLATE_SUCCESS = 'SAVE_TEMPLATE_SUCCESS'

export const REQUEST_FAILURE = 'REQUEST_FAILURE'

export const ADD_COMMON_FORM = 'ADD_COMMON_FORM'
export const DELETE_FORM = 'DELETE_FORM'
export const EDIT_FORM = 'EDIT_FORM'
export const GET_ACTIVE_FORM = 'GET_ACTIVE_FORM'
/**
 * Actions
 */
export const addCommonForm = (formType) => {
  return {
    type: ADD_COMMON_FORM,
    payload: formType
  }
}

export const deleteForm = (index) => {
  return {
    type: DELETE_FORM,
    index
  }
}

export const getActiveForm = (index) => {
  return {
    type: GET_ACTIVE_FORM,
    index
  }
}

export const editForm = (updataValue) => {
  return {
    type: EDIT_FORM,
    updataValue
  }
}

export const requestTemplatePosts = () => {
  return {
    type: REQUEST_TEMPLATE_POSTS
  }
}

export const requestTemplateSuccess = (data) => {
  return {
    type: REQUEST_TEMPLATE_SUCCESS,
    payload: data
  }
}

export const saveTemplatePosts = () => {
  return {
    type: SAVE_TEMPLATE_POSTS
  }
}

export const saveTemplateSuccess = (data) => {
  return {
    type: SAVE_TEMPLATE_SUCCESS,
    payload: data
  }
}

export const requestFailure = (err) => {
  return {
    type: REQUEST_FAILURE,
    err
  }
}

export const postTemplate = (formTemp) => {
  return (dispatch) => {
    dispatch(saveTemplatePosts())
    return axios.post(`${API_SAVE_TEMPLATE_URL}`,{
      ...formTemp})
      .then(res => dispatch(saveTemplateSuccess(res.data)))
      .catch(res => dispatch(requestFailure(res)))
  }
}

export const getTemplate = (id) => {
  return (dispatch) => {
    dispatch(requestTemplatePosts())
    return axios.get(`${API_GET_ORDER_TEMPLATE_URL}?id=${id}`)
      .then(res => dispatch(requestTemplateSuccess(res.data)))
      .catch(res => dispatch(requestFailure(res)))
  }
}

export const actions = {
  addCommonForm,
  postTemplate,
  getTemplate,
  deleteForm,
  editForm,
  getActiveForm,
}

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
  [ADD_COMMON_FORM]: (state, {payload}) => {

    if (typeof state.allFormType[payload] === 'undefined') {
      return ({
        ...state
      })
    }
    let lastId = '0';
    if (state.formList.length > 0) {
      lastId = parseInt(state.formList[state.formList.length-1].name) + 1;
    }
    const newForm = {
      ...state.allFormType[payload],
      name: lastId.toString()
    }

    return ({
      ...state,
      formList: [
        ...state.formList,
          newForm
      ]
    })
  },

  [SAVE_TEMPLATE_POSTS]: (state) => {

    return ({
      ...state,
      isLoading: true,
    })
  },

  [SAVE_TEMPLATE_SUCCESS]: (state, {payload:{data, status}}) => {
    if (status !== 'done') {
      return ({
        ...state,
        isLoading: false,
      })
    }
    return ({
      ...state,
      formList: [],
      title: '',
      editIndex: null,
      isLoading: false,
    })
  },

  [REQUEST_TEMPLATE_POSTS]: (state) => {

    return ({
      ...state,
      isLoading: true,
    })
  },

  [REQUEST_TEMPLATE_SUCCESS]: (state, {payload:{data:{formList, title}, status}}) => {

    if (status !== 'done') {
      return ({
        ...state,
        isLoading: false,
      })
    }
    return ({
      ...state,
      formList: [
        ...formList
      ],
      title: title,
      isLoading: false,
    })
  },

  [REQUEST_FAILURE]: (state, {err}) => {

    return ({
      ...state,
      isLoading: false,
      error: err
    })
  },

  [GET_ACTIVE_FORM]: (state, {index}) => {

    return ({
      ...state,
      editIndex: index
    })
  },

  [DELETE_FORM]: (state, {index}) => {
    const prev = state.formList.slice(0, index);
    const after = state.formList.slice(index+1);

    return ({
      ...state,
      editIndex: null,
      formList:[
        ...prev,
        ...after
      ],
    })
  },

  [EDIT_FORM]: (state, {updataValue:{formIndex, newData}}) => {
    const prev = state.formList.slice(0, formIndex);
    const after = state.formList.slice(formIndex+1);
    const curr = {...state.formList[formIndex],...newData};

    return ({
      ...state,
      formList:[
        ...prev,
        curr,
        ...after
      ]
    })
  },
}

/**
 * Reducers
 */
const initialState = {}
export default function adminReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
