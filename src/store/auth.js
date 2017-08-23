import axios from 'axios'
import { browserHistory } from 'react-router'
import store from 'store'
import apiConfig from 'vcfg/apiConfig'
// console.log(apiConfig)

export const ApiList = apiConfig.apiList

export const requestAuthInstance = axios.create({
  baseURL: apiConfig.apiBaseUrl,
  headers: {
    'Authorization': store.get('access_token') || null,
    'User-Id': store.get('user_id') || null
  }
})

export const requestInstance = axios.create({
  baseURL: apiConfig.apiBaseUrl
})

/**
 * Constants
 */
// Login.
export const AUTH_LOGIN_POSTS = 'AUTH_LOGIN_POSTS'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'

// Logout.
export const AUTH_LOGOUT_POSTS = 'AUTH_LOGOUT_POSTS'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_LOGOUT_FAILURE = 'AUTH_LOGOUT_FAILURE'

// Register.
export const AUTH_REGISTER_POSTS = 'AUTH_REGISTER_POSTS'
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS'
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE'

// Validate Token.
export const VALIDATE_TOKEN_POSTS = 'VALIDATE_TOKEN_POSTS'
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS'
export const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE'

// Modify Password
export const MODIFY_PASSWORD_POSTS = 'MODIFY_PASSWORD_POSTS'
export const MODIFY_PASSWORD_SUCCESS = 'MODIFY_PASSWORD_SUCCESS'
export const MODIFY_PASSWORD_FAILURE = 'MODIFY_PASSWORD_FAILURE'

// Reset Password
export const RESET_PASSWORD_POSTS = 'RESET_PASSWORD_POSTS'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

/**
 * Actions
 */
// Login.
export const requestLoginPosts = () => {
  return {
    type: AUTH_LOGIN_POSTS
  }
}

export const requestLoginSuccess = (data) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestLoginFailure = () => {
  return {
    type: AUTH_LOGIN_FAILURE
  }
}

// Logout.
export const requestLogoutPosts = () => {
  return {
    type: AUTH_LOGOUT_POSTS
  }
}

export const requestLogoutSuccess = (data) => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestLogoutFailure = () => {
  return {
    type: AUTH_LOGOUT_FAILURE
  }
}

// Register.
export const requestRegisterPosts = () => {
  return {
    type: AUTH_REGISTER_POSTS
  }
}

export const requestRegisterSuccess = (data) => {
  return {
    type: AUTH_REGISTER_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestRegisterFailure = () => {
  return {
    type: AUTH_REGISTER_FAILURE
  }
}

// Validate Token.
export const validateTokenPosts = () => {
  return {
    type: VALIDATE_TOKEN_POSTS
  }
}

export const validateTokenSuccess = (data) => {
  return {
    type: VALIDATE_TOKEN_SUCCESS,
    payload: {
      data
    }
  }
}

export const validateTokenFailure = () => {
  return {
    type: VALIDATE_TOKEN_FAILURE
  }
}

// Modify Password.
export const modifyPasswordPosts = () => {
  return {
    type: MODIFY_PASSWORD_POSTS
  }
}

export const modifyPasswordSuccess = (data) => {
  return {
    type: MODIFY_PASSWORD_SUCCESS,
    payload: {
      data
    }
  }
}

export const modifyPasswordFailure = () => {
  return {
    type: MODIFY_PASSWORD_FAILURE
  }
}

// Reset Password.
export const resetPasswordPosts = () => {
  return {
    type: RESET_PASSWORD_POSTS
  }
}

export const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: {
      data
    }
  }
}

export const resetPasswordFailure = () => {
  return {
    type: RESET_PASSWORD_FAILURE
  }
}

/**
 * Method.
 */

export const handleLogin = (loginData, callback) => {
  return (dispatch) => {
    dispatch(requestLoginPosts())

    return requestInstance.get(apiConfig.apiList.auth.login, {
      params: {
        ...loginData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userId, userName, accessToken } = res.data.data
          dispatch(requestLoginSuccess(res.data.data))
          console.log(accessToken)
          store.set('access_token', accessToken)
          store.set('user_id', userId)
          store.set('user_name', userName)
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
      store.remove('access_token')
      store.remove('user_id')
      store.remove('user_name')
      dispatch(requestLogoutSuccess())
      callback && callback()
    } catch (err) {
      console.log(err)
      dispatch(requestLogoutFailure())
    }
  }
}

export const handleRegister = (registerData, callback) => {
  return (dispatch) => {
    dispatch(requestRegisterPosts())

    return requestInstance.get(apiConfig.apiList.auth.register, {
      params: {
        ...registerData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userId, userName, accessToken } = res.data.data
          dispatch(requestRegisterSuccess(res.data.data))
          console.log(accessToken)
          store.set('access_token', accessToken)
          store.set('user_id', userId)
          store.set('user_name', userName)
          callback && callback()
        } else {
          dispatch(requestRegisterFailure())
        }
      })
      .catch(err => {
        dispatch(requestRegisterFailure())
        console.log(err)
      })
  }
}

export const handleValidateToken = () => {
  return (dispatch) => {
    dispatch(validateTokenPosts())

    return requestInstance.get(apiConfig.apiList.auth.validateToken, {
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
          const { userId, userName, accessToken } = res.data.data
          // console.log(accessToken)
          store.set('access_token', accessToken)
          store.set('user_id', userId)
          store.set('user_name', userName)
          dispatch(validateTokenSuccess(res.data.data))
        } else {
          store.remove('access_token')
          store.remove('user_id')
          store.remove('user_name')
          dispatch(validateTokenFailure())
          browserHistory.push('/')
        }
      })
      .catch(err => {
        store.remove('access_token')
        store.remove('user_id')
        store.remove('user_name')
        dispatch(validateTokenFailure())
        browserHistory.push('/')
        console.log(err)
      })
  }
}

export const handleModifyPassword = (passwordData, callback) => {
  return (dispatch) => {
    dispatch(modifyPasswordPosts())

    return requestAuthInstance.get(apiConfig.apiList.auth.modifyPsw, {
      params: {
        ...passwordData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userId, userName, accessToken } = res.data.data
          dispatch(modifyPasswordSuccess(res.data.data))
          console.log(accessToken)
          store.set('access_token', accessToken)
          store.set('user_id', userId)
          store.set('user_name', userName)
          callback && callback()
        } else {
          dispatch(modifyPasswordFailure())
        }
      })
      .catch(err => {
        dispatch(modifyPasswordFailure())
        console.log(err)
      })
  }
}

export const handleResetPassword = (passwordData, callback) => {
  return (dispatch) => {
    dispatch(resetPasswordPosts())

    return requestInstance.get(apiConfig.apiList.auth.resetPsw, {
      params: {
        ...passwordData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userId, userName, accessToken } = res.data.data
          dispatch(resetPasswordSuccess(res.data.data))
          console.log(accessToken)
          store.set('access_token', accessToken)
          store.set('user_id', userId)
          store.set('user_name', userName)
          callback && callback()
        } else {
          dispatch(resetPasswordFailure())
        }
      })
      .catch(err => {
        dispatch(resetPasswordFailure())
        console.log(err)
      })
  }
}

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
  [AUTH_LOGIN_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [AUTH_LOGIN_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      userId: action.payload.data.userId,
      userName: action.payload.data.userName,
      accessToken: action.payload.data.accessToken
    })
  },
  [AUTH_LOGIN_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [AUTH_LOGOUT_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [AUTH_LOGOUT_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      userId: null,
      userName: '',
      accessToken: null
    })
  },
  [AUTH_LOGOUT_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [AUTH_REGISTER_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [AUTH_REGISTER_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      userId: action.payload.data.userId,
      userName: action.payload.data.userName,
      accessToken: action.payload.data.accessToken
    })
  },
  [AUTH_REGISTER_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [VALIDATE_TOKEN_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [VALIDATE_TOKEN_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      userId: action.payload.data.userId,
      userName: action.payload.data.userName,
      accessToken: action.payload.data.accessToken
    })
  },
  [VALIDATE_TOKEN_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      userId: null,
      userName: '',
      accessToken: null
    })
  },
  [MODIFY_PASSWORD_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [MODIFY_PASSWORD_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      userId: action.payload.data.userid,
      userName: action.payload.data.userName,
      accessToken: action.payload.data.accesstoken
    })
  },
  [MODIFY_PASSWORD_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [RESET_PASSWORD_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [RESET_PASSWORD_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [RESET_PASSWORD_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
}

/**
 * Reducers
 */
const initialState = {
  isLoading: false,
  isAuthenticated: !!(store.get('access_token') && store.get('user_id')) || false,
  accessToken: store.get('access_token') || null,
  userId: store.get('user_id') || null,
  userName: store.get('user_name') || ''
}

export default function authReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
