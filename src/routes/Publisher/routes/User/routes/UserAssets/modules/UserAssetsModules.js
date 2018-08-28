import qs from 'qs'
import store from 'store'
import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

// console.log(requestAuthInstance)

/**
 * Constants
 */

export const REQUEST_USER_ASSETS_POSTS = 'REQUEST_USER_ASSETS_POSTS'
export const REQUEST_USER_ASSETS_SUCCESS = 'REQUEST_USER_ASSETS_SUCCESS'
export const REQUEST_USER_ASSETS_FAILURE = 'REQUEST_USER_ASSETS_FAILURE'

export const UPDATE_USER_ASSETS_POSTS = 'UPDATE_USER_ASSETS_POSTS'
export const UPDATE_USER_ASSETS_SUCCESS = 'UPDATE_USER_ASSETS_SUCCESS'
export const UPDATE_USER_ASSETS_FAILURE = 'UPDATE_USER_ASSETS_FAILURE'

/**
 * Actions
 */
// Request User list.

// Change user status.
export const requestUserAssetsPosts = () => {
  return {
    type: REQUEST_USER_ASSETS_POSTS
  }
}

export const requestUserAssetsSuccess = (data) => {
  return {
    type: REQUEST_USER_ASSETS_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestUserAssetsFailure = () => {
  return {
    type: REQUEST_USER_ASSETS_FAILURE
  }
}

// Reset user password.
export const updateUserAssetsPosts = () => {
  return {
    type: UPDATE_USER_ASSETS_POSTS
  }
}

export const updateUserAssetsSuccess = (data) => {
  return {
    type: UPDATE_USER_ASSETS_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateUserAssetsFailure = () => {
  return {
    type: UPDATE_USER_ASSETS_FAILURE
  }
}


/**
 * Async method
 */
export const fetchUserAssetsInfo = (params, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestUserAssetsPosts())
    return requestAuthInstance.get(ApiList.user.userAssets, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...params,
        rnd: Date.now()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestUserAssetsSuccess(res.data.data))
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestUserAssetsFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(requestUserAssetsFailure())
        errorCallback && errorCallback(err.data.msg)
        console.log(err)
      })
  }
}

export const updateUserAssetsInfo = (userInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(updateUserAssetsPosts())

    return requestAuthInstance.post(ApiList.user.updateUserAssets, qs.stringify(userInfo), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(updateUserAssetsSuccess())
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(updateUserAssetsFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(updateUserAssetsFailure())
        errorCallback && errorCallback(err.data.msg)
        console.log(err)
      })
  }
}

export const actions = {
}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_USER_ASSETS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_USER_ASSETS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      userAssetsInfo: {
        ...state.userAssetsInfo,
        ...action.payload.data
      }
    })
  },
  [REQUEST_USER_ASSETS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [UPDATE_USER_ASSETS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [UPDATE_USER_ASSETS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [UPDATE_USER_ASSETS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  }
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  userAssetsInfo: {
    userInfo: {},
    list: [],
    current: 1,
    pageSize: 30,
    total: 0
  }
}

export default function userAssetsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
