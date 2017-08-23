import axios from 'axios'

/**
 * Constants
 */
export const MODIFY_PASSWORD_POSTS = 'MODIFY_PASSWORD_POSTS'
export const MODIFY_PASSWORD_SUCCESS = 'MODIFY_PASSWORD_SUCCESS'
export const MODIFY_PASSWORD_FAILURE = 'MODIFY_PASSWORD_FAILURE'

/**
 * Actions
 */
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

export const handleModifyPassword = (passwordData, callback) => {
  return (dispatch) => {
    dispatch(modifyPasswordPosts())

    return axios.get('mocks/password.json', {
      params: {
        ...passwordData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userid, accesstoken } = res.data.data
          dispatch(modifyPasswordSuccess(res.data.data))
          console.log(accesstoken)
          localStorage.setItem('access_token', accesstoken)
          localStorage.setItem('user_id', userid)
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

export const actions = {
  handleModifyPassword
}

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
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
      accessToken: action.payload.data.accesstoken
    })
  },
  [MODIFY_PASSWORD_FAILURE]: (state) => {
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

export default function passwordReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]
  // console.log(handler)

  return handler ? handler(state, action) : state
}
