import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_COUNTER_POSTS = 'REQUEST_COUNTER_POSTS'
export const REQUEST_COUNTER_SUCCESS = 'REQUEST_COUNTER_SUCCESS'
export const REQUEST_COUNTER_FAILURE = 'REQUEST_COUNTER_FAILURE'

/**
 * Actions
 */
export const requestCounterPosts = () => {
  return {
    type: REQUEST_COUNTER_POSTS
  }
}

export const requestCounterSuccess = (data) => {
  return {
    type: REQUEST_COUNTER_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestCounterFailure = () => {
  return {
    type: REQUEST_COUNTER_FAILURE
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
/**
 * Async method
 */
export const fetchCounter = () => {
  return (dispatch, getState) => {
    dispatch(requestCounterPosts())

    return requestAuthInstance.get(ApiList.dash.index, {
      params: {
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestCounterSuccess(res.data.data))
        } else {
          dispatch(requestCounterFailure())
        }
      })
      .catch(err => {
        dispatch(requestCounterFailure())
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  fetchCounter
}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_COUNTER_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_COUNTER_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      counter: action.payload.data.counter
    })
  },
  [REQUEST_COUNTER_FAILURE]: (state) => {
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
  counter: {}
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
