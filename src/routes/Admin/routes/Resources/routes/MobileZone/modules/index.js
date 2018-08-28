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
export const REQUEST_ACTIVITY_TYPE_POSTS = 'REQUEST_ACTIVITY_TYPE_POSTS'
export const REQUEST_ACTIVITY_TYPE_SUCCESS = 'REQUEST_ACTIVITY_TYPE_SUCCESS'
export const REQUEST_ACTIVITY_TYPE_FAILURE = 'REQUEST_ACTIVITY_TYPE_FAILURE'

/**
 * Actions
 */
// Activity caterious
export const requestActivityTypePosts = () => {
  return {
    type: REQUEST_ACTIVITY_TYPE_POSTS
  }
}

export const requestActivityTypeSuccess = data => {
  return {
    type: REQUEST_ACTIVITY_TYPE_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestActivityTypeFailure = () => {
  return {
    type: REQUEST_ACTIVITY_TYPE_FAILURE
  }
}

/**
 * Async method
 */
export const fetchActivityType = (params, successCallback, failureCallback) => {
  return (dispatch) => {
    dispatch(requestActivityTypePosts())
    return requestAuthInstance.get(ApiList.Resources.activityType, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...params,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestActivityTypeSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestActivityTypeFailure())
          failureCallback && failureCallback()
        }
      })
      .catch(err => {
        dispatch(requestActivityTypeFailure())
        failureCallback && failureCallback()
        console.log(err)
      })
  }
}

export const fetchTypeInfo = (params, successCallback, failureCallback) => {
  return (dispatch) => {
    return requestAuthInstance.get(ApiList.Resources.activityTypeInfo, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...params,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          successCallback && successCallback(res.data.data)
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

export const fetchPublishUsers = (publishInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    // dispatch(requestPublishUsersPosts())
    return requestAuthInstance.get(ApiList.publish.publishUsers, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...publishInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          // dispatch(requestPublishUsersSuccess())
          successCallback && successCallback(res.data.data)
        } else {
          // dispatch(requestPublishUsersFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        // dispatch(requestPublishUsersFailure())
        console.log(err)
      })
  }
}
export const fetchPublishTags = (publishInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    // dispatch(requestPublishTagsPosts())

    return requestAuthInstance.get(ApiList.publish.publishTags, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...publishInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          // dispatch(requestPublishTagsSuccess())
          successCallback && successCallback(res.data.data)
        } else {
          // dispatch(requestPublishTagsFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        // dispatch(requestPublishTagsFailure())
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
  [REQUEST_ACTIVITY_TYPE_POSTS]: state => {
    return ({
      ...state
    })
  },
  [REQUEST_ACTIVITY_TYPE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      activityTypeList: action.payload.data
    })
  },
  [REQUEST_ACTIVITY_TYPE_FAILURE]: state => {
    return ({
      ...state
    })
  }
}

/**
 * Reducer
 */
const initialState = {
  activityTypeList: []
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
