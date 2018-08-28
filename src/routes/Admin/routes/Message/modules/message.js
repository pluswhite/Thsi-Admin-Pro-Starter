import store from 'store'
import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_MESSAGE_POSTS = 'REQUEST_MESSAGE_POSTS'
export const REQUEST_MESSAGE_SUCCESS = 'REQUEST_MESSAGE_SUCCESS'
export const REQUEST_MESSAGE_FAILURE = 'REQUEST_MESSAGE_FAILURE'

/**
 * Actions
 */
export const requestMessagePosts = () => {
  return {
    type: REQUEST_MESSAGE_POSTS
  }
}

export const requestMessageSuccess = (data) => {
  return {
    type: REQUEST_MESSAGE_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestMessageFailure = () => {
  return {
    type: REQUEST_MESSAGE_FAILURE
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
/**
 * Async method
 */
export const fetchMessage = () => {
  return (dispatch, getState) => {
    dispatch(requestMessagePosts())

    return requestAuthInstance.get(ApiList.me.message, {
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
          dispatch(requestMessageSuccess(res.data.data))
        } else {
          dispatch(requestMessageFailure())
        }
      })
      .catch(err => {
        dispatch(requestMessageFailure())
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  fetchMessage
}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_MESSAGE_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_MESSAGE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      messageList: action.payload.data.list
    })
  },
  [REQUEST_MESSAGE_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  messageList: []
}
export default function messageReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
