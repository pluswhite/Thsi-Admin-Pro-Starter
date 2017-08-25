import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_TOTAL_REPORTS_POSTS = 'REQUEST_TOTAL_REPORTS_POSTS'
export const REQUEST_TOTAL_REPORTS_SUCCESS = 'REQUEST_TOTAL_REPORTS_SUCCESS'
export const REQUEST_TOTAL_REPORTS_FAILURE = 'REQUEST_TOTAL_REPORTS_FAILURE'

export const CLEAR_TOTAL_REPORTS_LIST = 'CLEAR_TOTAL_REPORTS_LIST'

/**
 * Actions
 */
export const requestTotalReportPosts = () => {
  return {
    type: REQUEST_TOTAL_REPORTS_POSTS
  }
}

export const requestTotalReportSuccess = (data) => {
  return {
    type: REQUEST_TOTAL_REPORTS_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestTotalReportFailure = () => {
  return {
    type: REQUEST_TOTAL_REPORTS_FAILURE
  }
}

export const clearTotalReportList = () => {
  return {
    type: CLEAR_TOTAL_REPORTS_LIST
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
/**
 * Async method
 */
export const fetchTotalReport = () => {
  return (dispatch, getState) => {
    dispatch(requestTotalReportPosts())

    return requestAuthInstance.get(ApiList.reports.index, {
      params: {
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestTotalReportSuccess(res.data.data))
        } else {
          dispatch(requestTotalReportFailure())
        }
      })
      .catch(err => {
        dispatch(requestTotalReportFailure())
        console.log(err)
      })
  }
}

export const clearTotalReport = () => {
  return (dispatch) => {
    dispatch(clearTotalReportList())
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  fetchTotalReport
}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_TOTAL_REPORTS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_TOTAL_REPORTS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      reportList: action.payload.data.list
    })
  },
  [REQUEST_TOTAL_REPORTS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [CLEAR_TOTAL_REPORTS_LIST]: (state) => {
    return ({
      ...state,
      reportList: []
    })
  },
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  reportList: []
}
export default function totalReportReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
