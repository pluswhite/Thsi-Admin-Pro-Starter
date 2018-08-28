import axios from 'axios'

/**
 * Constants
 */
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN'

export const REQUEST_ME_POSTS = 'REQUEST_ME_POSTS'
export const REQUEST_ME_SUCCESS = 'REQUEST_ME_SUCCESS'
export const REQUEST_ME_FAILURE = 'REQUEST_ME_FAILURE'

/**
 * Actions
 */
export const requestMePosts = () => {
  return {
    type: REQUEST_ME_POSTS
  }
}

export const requestMeSuccess = (data) => {
  return {
    type: REQUEST_ME_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestMeFailure = () => {
  return {
    type: REQUEST_ME_FAILURE
  }
}

export const handleMe = (MeData, callback) => {
  return (dispatch) => {
    dispatch(requestMePosts())

    return axios.get('mocks/Me.json', {
      params: {
        ...MeData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          const { userid, accesstoken } = res.data.data
          dispatch(requestMeSuccess(res.data.data))
          console.log(accesstoken)
          localStorage.setItem('access_token', accesstoken)
          localStorage.setItem('user_id', userid)
          callback && callback()
        } else {
          dispatch(requestMeFailure())
        }
      })
      .catch(err => {
        dispatch(requestMeFailure())
        console.log(err)
      })
  }
}

export const actions = {
  handleMe
}

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
  [REQUEST_ME_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_ME_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      userId: action.payload.data.userid,
      accessToken: action.payload.data.accesstoken
    })
  },
  [REQUEST_ME_FAILURE]: (state) => {
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

export default function MeReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]
  // console.log(handler)

  return handler ? handler(state, action) : state
}
