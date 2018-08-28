import { requestAuthInstance, ApiList } from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_ORDER_REPORTS_POSTS = 'REQUEST_ORDER_REPORTS_POSTS'
export const REQUEST_ORDER_REPORTS_SUCCESS = 'REQUEST_ORDER_REPORTS_SUCCESS'
export const REQUEST_ORDER_REPORTS_FAILURE = 'REQUEST_ORDER_REPORTS_FAILURE'

/**
 * Actions
 */
export const requestUserReportPosts = () => {
  return {
    type: REQUEST_ORDER_REPORTS_POSTS
  }
}

export const requestUserReportSuccess = data => {
  return {
    type: REQUEST_ORDER_REPORTS_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestUserReportFailure = () => {
  return {
    type: REQUEST_ORDER_REPORTS_FAILURE
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
/**
 * Async method
 */
export const fetchReport = (params, success, fail) => {
  return dispatch => {
    dispatch(requestUserReportPosts())
    return requestAuthInstance
      .get(ApiList.reports.order, {
        params: {
          ...params,
          rnd: Date.now()
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          success && success(res.data.data)
          dispatch(requestUserReportSuccess(res.data.data))
        } else {
          dispatch(requestUserReportFailure())
          fail && fail()
        }
      })
      .catch(err => {
        dispatch(requestUserReportFailure())
        fail && fail()
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_ORDER_REPORTS_POSTS]: state => {
    return {
      ...state,
      isLoading: true
      // reportList: []
    }
  },
  [REQUEST_ORDER_REPORTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      reportTotal: [action.payload.data.total],
      reportList: action.payload.data.list
    }
  },
  [REQUEST_ORDER_REPORTS_FAILURE]: state => {
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
  isLoading: false,
  reportTotal: [],
  reportList: []
}
export default function orderReportReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
