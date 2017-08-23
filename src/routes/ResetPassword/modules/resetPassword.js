import axios from 'axios'

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
export const requestResetPasswordPosts = () => {
  return {
    type: REQUEST_LOGIN_POSTS
  }
}

export const requestResetPasswordSuccess = (data) => {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestResetPasswordFailure = () => {
  return {
    type: REQUEST_LOGIN_FAILURE
  }
}

export const handleResetPassword = (resetPasswordData, callback) => {
  return (dispatch) => {
    dispatch(requestResetPasswordPosts())

    return axios.get('mocks/resetPassword.json', {
      params: {
        ...resetPasswordData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userid, accesstoken } = res.data.data
          dispatch(requestResetPasswordSuccess(res.data.data))
          console.log(accesstoken)
          localStorage.setItem('access_token', accesstoken)
          localStorage.setItem('user_id', userid)
          callback && callback()
        } else {
          dispatch(requestResetPasswordFailure())
        }
      })
      .catch(err => {
        dispatch(requestResetPasswordFailure())
        console.log(err)
      })
  }
}

export const actions = {
  handleResetPassword
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
  }
}

/**
 * Reducers
 */
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  userId: null,
  accessToken: null
}

export default function resetPasswordReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]
  // console.log(handler)

  return handler ? handler(state, action) : state
}
