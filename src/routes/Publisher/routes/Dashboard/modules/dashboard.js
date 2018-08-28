import { requestAuthInstance, ApiList } from 'vstore/auth'
import store from 'store'
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

export const requestDashSuccess = (data, dataContainer) => {
  return {
    type: REQUEST_DASH_SUCCESS,
    payload: {
      data,
      dataContainer
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

export const fetchData = (target, params, successCallback, failCallback) => {
  return dispatch => {
    return requestAuthInstance
      .get(ApiList.dash[target.api], {
        headers: {
          Authorization: store.get('access_token') || null,
          'User-Id': store.get('user_id') || null
        },
        params: {
          ...params,
          rnd: Date.now()
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestDashSuccess(res.data.data, target.data))
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestDashFailure())
          failCallback && failCallback()
        }
      })
      .catch(err => {
        dispatch(requestDashFailure())
        failCallback && failCallback()
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
  [REQUEST_DASH_POSTS]: state => {
    return {
      ...state,
      isLoading: true
    }
  },
  [REQUEST_DASH_SUCCESS]: (state, action) => {
    const { data, dataContainer } = action.payload
    // 热搜和分享翻页时可以只传list
    const tidyData = {
      ...(state[dataContainer] || {}),
      ...data
    }
    return {
      ...state,
      isLoading: false,
      [dataContainer]: tidyData
    }
  },
  [REQUEST_DASH_FAILURE]: state => {
    return {
      ...state,
      isLoading: false
    }
  }
}

/**
 * Reducer
 */
const initialState = {
  isLoading: true
}

export default function dashboardReducer (state = initialState, action) {
  const handler = ADMIN_DASHBOARD_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
