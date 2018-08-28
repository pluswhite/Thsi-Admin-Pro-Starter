import qs from 'qs'
import store from 'store'
import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */

// Activity list.


/**
 * Actions
 */
// Activity caterious

// Activity list.

/**
 * Async method
 */

export const addActivity = (params, successCallback, failureCallback) => {
  return (dispatch) => {
    return requestAuthInstance.post(ApiList.Resources.addActivity, qs.stringify(params), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          successCallback && successCallback()
        } else {
          failureCallback && failureCallback()
        }
      })
      .catch(err => {
        failureCallback && failureCallback()
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
const ACTION_HANDLERS = {
  // Activity list.
}

/**
 * Reducer
 */
const initialState = {
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
