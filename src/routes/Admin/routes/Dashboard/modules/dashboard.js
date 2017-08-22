import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_DASH_POSTS = 'REQUEST_DASH_POSTS'
export const REQUEST_DASH_SUCCESS = 'REQUEST_DASH_SUCCESS'
export const REQUEST_DASH_FAILURE = 'REQUEST_DASH_FAILURE'

/**
 * Actions
 */
export const requestDashPosts = () => {
  return {
    type: REQUEST_DASH_POSTS
  }
}

export const requestDashSuccess = (data) => {
  return {
    type: REQUEST_DASH_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestDashFailure = () => {
  return {
    type: REQUEST_DASH_FAILURE
  }
}

/**
 * Async method
 */
export const fetchDash = () => {
  return (dispatch) => {
    dispatch(requestDashPosts())

    return requestAuthInstance.get(ApiList.dash.index, {
      params: {
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestDashSuccess(res.data.data))
        } else {
          dispatch(requestDashFailure())
        }
      })
      .catch(err => {
        dispatch(requestDashFailure())
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const actions = {
// }

/**
 * Action Handlers
 */
const ADMIN_DASHBOARD_ACTION_HANDLERS = {
  [REQUEST_DASH_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_DASH_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      stats: action.payload.data.stats
    })
  },
  [REQUEST_DASH_FAILURE]: (state) => {
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
  stats: []
}

export default function dashboardReducer (state = initialState, action) {
  const handler = ADMIN_DASHBOARD_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
