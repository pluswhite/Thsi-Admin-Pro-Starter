import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_PROFILE_POSTS = 'REQUEST_PROFILE_POSTS'
export const REQUEST_PROFILE_SUCCESS = 'REQUEST_PROFILE_SUCCESS'
export const REQUEST_PROFILE_FAILURE = 'REQUEST_PROFILE_FAILURE'

/**
 * Actions
 */
export const requestProfilePosts = () => {
  return {
    type: REQUEST_PROFILE_POSTS
  }
}

export const requestProfileSuccess = (data) => {
  return {
    type: REQUEST_PROFILE_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestProfileFailure = () => {
  return {
    type: REQUEST_PROFILE_FAILURE
  }
}

/**
 * Async method
 */
export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(requestProfilePosts())

    return requestAuthInstance.get(ApiList.me.profile, {
      params: {
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestProfileSuccess(res.data.data))
        } else {
          dispatch(requestProfileFailure())
        }
      })
      .catch(err => {
        dispatch(requestProfileFailure())
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const actions = {}

/**
 * Action Handlers
 */
const PROFILE_ACTION_HANDLERS = {
  [REQUEST_PROFILE_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_PROFILE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      userInfo: action.payload.data
    })
  },
  [REQUEST_PROFILE_FAILURE]: (state) => {
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
  userInfo: {
    'name': '',
    'phone': '',
    'email': '',
    'country': ''
  }
}

export default function profileReducer (state = initialState, action) {
  const handler = PROFILE_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
