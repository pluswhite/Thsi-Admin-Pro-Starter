import fetch from 'isomorphic-fetch'

/**
 * Constants
 */
export const REQUEST_AUTH_POSTS = 'REQUEST_AUTH_POSTS'
export const REQUEST_AUTH_SUCCESS = 'REQUEST_AUTH_SUCCESS'
export const REQUEST_AUTH_FAILURE = 'REQUEST_AUTH_FAILURE'
export const REQUEST_AUTH_CLEAR = 'REQUEST_AUTH_CLEAR'
export const FETCH_AUTH_DATA_REQUEST = 'FETCH_AUTH_DATA_REQUEST'
export const RECEIVE_AUTH_DATA = 'RECEIVE_AUTH_DATA'
export const FETCH_AUTH_DATA_FAILURE = 'FETCH_AUTH_DATA_FAILURE'
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN'

/**
 * Actions
 */
export const requestAuthPosts = () => {
  return {
    type: REQUEST_AUTH_POSTS
  }
}

export const requestAuthSuccess = () => {
  return {
    type: REQUEST_AUTH_SUCCESS
  }
}

export const requestAuthFailure = () => {
  return {
    type: REQUEST_AUTH_FAILURE
  }
}

export const fetchAuth = () => {
  return (dispatch) => {
    dispatch(requestAuthPosts())

    return fetch('/user/login')
      .then(res => res.json())
      .then(res => dispatch(requestAuthSuccess(res)))
  }
}

export const actions = {
  requestAuthPosts,
  requestAuthSuccess,
  requestAuthFailure,
  fetchAuth
}

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
  [REQUEST_AUTH_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_AUTH_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_AUTH_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  }
}

/**
 * Reducers
 */
const initialState = {
  isLoading: false
}

export default function loginReducer(state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]
  // console.log(handler)

  return handler ? handler(state, action) : state
}
