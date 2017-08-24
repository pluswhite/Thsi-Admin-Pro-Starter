import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_REPORTS_POSTS = 'REQUEST_REPORTS_POSTS'
export const REQUEST_REPORTS_SUCCESS = 'REQUEST_REPORTS_SUCCESS'
export const REQUEST_REPORTS_FAILURE = 'REQUEST_REPORTS_FAILURE'

/**
 * Actions
 */
export const requestReportsPosts = () => {
  return {
    type: REQUEST_REPORTS_POSTS
  }
}

export const requestReportsSuccess = (data) => {
  return {
    type: REQUEST_REPORTS_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestReportsFailure = () => {
  return {
    type: REQUEST_REPORTS_FAILURE
  }
}

/**
 * Async method
 */
export const fetchReports = (searchData) => {
  return (dispatch) => {
    dispatch(requestReportsPosts())

    return requestAuthInstance.get(ApiList.reports.index, {
      params: {
        ...searchData,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestReportsSuccess(res.data.data))
        } else {
          dispatch(requestReportsFailure())
        }
      })
      .catch(err => {
        dispatch(requestReportsFailure())
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
}

/**
 * Action Handlers
 */
const ADMIN_REPORTS_ACTION_HANDLERS = {
  [REQUEST_REPORTS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_REPORTS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      reportList: action.payload.data.list
    })
  },
  [REQUEST_REPORTS_FAILURE]: (state) => {
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
  reportList: []
}

export default function UserReducer (state = initialState, action) {
  const handler = ADMIN_REPORTS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
