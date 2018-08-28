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

export const REQUEST_ACTIVITY_LIST_POSTS = 'REQUEST_ACTIVITY_LIST_POSTS'
export const REQUEST_ACTIVITY_LIST_SUCCESS = 'REQUEST_ACTIVITY_LIST_SUCCESS'
export const REQUEST_ACTIVITY_LIST_FAILURE = 'REQUEST_ACTIVITY_LIST_FAILURE'

export const UPDATE_ACTIVITY_STATUS = 'UPDATE_ACTIVITY_STATUS'

/**
 * Actions
 */
// Activity caterious

// Activity list.
export const requestZonelistPosts = () => {
  return {
    type: REQUEST_ACTIVITY_LIST_POSTS
  }
}

export const requestZonelistSuccess = data => {
  return {
    type: REQUEST_ACTIVITY_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestZonelistFailure = () => {
  return {
    type: REQUEST_ACTIVITY_LIST_FAILURE
  }
}

export const updateActivityStatus = data => {
  return {
    type: UPDATE_ACTIVITY_STATUS,
    payload: {
      data
    }
  }
}

/**
 * Async method
 */

export const fetchZonelist = (params, successCallback, failureCallback) => {
  return (dispatch) => {
    dispatch(requestZonelistPosts())
    return requestAuthInstance.get(ApiList.Resources.Zonelist, {
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
          dispatch(requestZonelistSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestZonelistFailure())
          failureCallback && failureCallback()
        }
      })
      .catch(err => {
        dispatch(requestZonelistFailure())
        failureCallback && failureCallback()
        console.log(err)
      })
  }
}

export const updateStatus = (params, successCallback, failureCallback) => {
  const idx = params.idx
  const status = params.status
  delete params.idx
  return (dispatch) => {
    return requestAuthInstance.get(ApiList.Resources.updateActivityStatus,
      {
        headers: {
          'Authorization': store.get('access_token') || null,
          'User-Id': store.get('user_id') || null
        },
        params: {
          ...params,
          status: status === '2' ? 'on' : 'off',
          'rnd': (new Date()).getTime()
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(updateActivityStatus({
            idx,
            status
          }))
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
  [REQUEST_ACTIVITY_LIST_POSTS]: state => {
    return ({
      ...state,
      isLoading: true,
      fetchZonelistSuccess: true,
    })
  },
  [REQUEST_ACTIVITY_LIST_SUCCESS]: (state, action) => {
    let { list, infos } = action.payload.data
    return ({
      ...state,
      isLoading: false,
      fetchZonelistSuccess: true,
      Zonelist: list,
      pagination: infos
    })
  },
  [REQUEST_ACTIVITY_LIST_FAILURE]: state => {
    return ({
      ...state,
      isLoading: false,
      fetchZonelistSuccess: false,
      Zonelist: [],
      pagination: {}
    })
  },
  [UPDATE_ACTIVITY_STATUS]: (state, action) => {
    let Zonelist = state.Zonelist.slice()
    const { idx, status } = action.payload.data
    Zonelist[idx].status = status
    return ({
      ...state,
      Zonelist
    })
  }
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  fetchZonelistSuccess: true,
  pagination: {},
  Zonelist: []
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
