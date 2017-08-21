import axios from 'axios'

/**
 * Constants
 */
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN'

export const REQUEST_LOGIN_POSTS = 'REQUEST_LOGIN_POSTS'
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS'
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE'

export const REQUEST_LOGOUT_POSTS = 'REQUEST_LOGOUT_POSTS'
export const REQUEST_LOGOUT_SUCCESS = 'REQUEST_LOGOUT_SUCCESS'
export const REQUEST_LOGOUT_FAILURE = 'REQUEST_LOGOUT_FAILURE'

/**
 * Actions
 */
export const requestLoginPosts = () => {
  return {
    type: REQUEST_LOGIN_POSTS
  }
}

export const requestLoginSuccess = (data) => {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestLoginFailure = () => {
  return {
    type: REQUEST_LOGIN_FAILURE
  }
}

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

export const handleLogin = (loginData, callback) => {
  return (dispatch) => {
    dispatch(requestLoginPosts())

    return axios.get('mocks/login.json', {
      params: {
        ...loginData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userid, accesstoken } = res.data.data
          dispatch(requestLoginSuccess(res.data.data))
          console.log(accesstoken)
          localStorage.setItem('access_token', accesstoken)
          localStorage.setItem('user_id', userid)
          callback && callback()
        } else {
          dispatch(requestLoginFailure())
        }
      })
      .catch(err => {
        dispatch(requestLoginFailure())
        console.log(err)
      })
  }
}

export const handleLogout = (callback) => {
  return (dispatch) => {
    dispatch(requestLogoutPosts())
    try {
      // Clear local access_token & user_id
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_id')
      dispatch(requestLogoutSuccess())
      callback && callback()
    } catch (err) {
      console.log(err)
      dispatch(requestLogoutFailure())
    }
  }
}

export const actions = {
  handleLogin,
  handleLogout
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
      isLoading: false,
      isAuthenticated: true,
      userId: action.payload.data.userid,
      accessToken: action.payload.data.accesstoken
    })
  },
  [REQUEST_LOGIN_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_LOGOUT_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_LOGOUT_SUCCESS]: (state, action) => {
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
  isAuthenticated: !!(localStorage.getItem('access_token') && localStorage.getItem('user_id')) || false,
  userId: localStorage.getItem('user_id') || null,
  accessToken: localStorage.getItem('access_token') || null
}

export default function authReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
