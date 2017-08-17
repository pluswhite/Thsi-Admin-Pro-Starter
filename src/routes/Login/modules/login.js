import fetch from 'isomorphic-fetch'

/**
 * Constants
 */
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN'

export const REQUEST_LOGIN_POSTS = 'REQUEST_LOGIN_POSTS'
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS'
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE'

/**
 * Actions
 */
export const requestLoginPosts = () => {
  return {
    type: REQUEST_LOGIN_POSTS
  }
}

export const requestLoginSuccess = () => {
  return {
    type: REQUEST_LOGIN_SUCCESS
  }
}

export const requestLoginFailure = () => {
  return {
    type: REQUEST_LOGIN_FAILURE
  }
}

export const handleLogin = (loginData) => {
  return (dispatch) => {
    console.log(loginData)
    dispatch(requestLoginPosts())

    return fetch('/mocks/login.json')
      .then(res => res.json())
      .then(res => dispatch(requestLoginSuccess(res)))
      .catch(() => dispatch(requestLoginFailure()))
  }
}

export const actions = {
  handleLogin
}

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
  [REQUEST_LOGIN_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_LOGIN_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_LOGIN_FAILURE]: (state) => {
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

export default function loginReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]
  // console.log(handler)

  return handler ? handler(state, action) : state
}
