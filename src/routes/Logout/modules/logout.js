// import {
//   requestAuthInstance,
//   apiList
// } from '../../auth'

/**
 * Constants
 */
export const REQUEST_LOGOUT_POSTS = 'REQUEST_LOGOUT_POSTS'
export const REQUEST_LOGOUT_SUCCESS = 'REQUEST_LOGOUT_SUCCESS'
export const REQUEST_LOGOUT_FAILURE = 'REQUEST_LOGOUT_FAILURE'

/**
 * Actions
 */

export const requestLogoutPosts = () => {
  return {
    type: REQUEST_LOGOUT_POSTS
  }
}

export const requestLogoutSuccess = (data) => {
  return {
    type: REQUEST_LOGOUT_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestLogoutFailure = () => {
  return {
    type: REQUEST_LOGOUT_FAILURE
  }
}

/**
 * Async method
 */
export const handleLogout = () => {
  return (dispatch) => {
    dispatch(requestLogoutPosts())
    try {
      // Clear local access_token & user_id
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_id')
      dispatch(requestLogoutSuccess())
    } catch (err) {
      console.log(err)
      dispatch(requestLogoutFailure())
    }
  }
}

export const actions = {
  requestLogoutPosts,
  requestLogoutSuccess,
  requestLogoutFailure,
  handleLogout
}

/**
 * Actions Handlers
 */
const LOGOUT_ACTION_HANDLERS = {
  [REQUEST_LOGOUT_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_LOGOUT_SUCCESS]: (state, action) => {
    console.log(state)
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      userId: null,
      accessToken: null
    })
  },
  [REQUEST_LOGOUT_FAILURE]: (state) => {
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
  isLoading: false,
}

export default function logouReducer (state = initialState, action) {
  const handler = LOGOUT_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
