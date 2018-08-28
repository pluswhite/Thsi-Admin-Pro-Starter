import qs from 'qs'
import store from 'store'
import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
// Role list.
export const REQUEST_ROLE_LIST_POSTS = 'REQUEST_ROLE_LIST_POSTS'
export const REQUEST_ROLE_LIST_SUCCESS = 'REQUEST_ROLE_LIST_SUCCESS'
export const REQUEST_ROLE_LIST_FAILURE = 'REQUEST_ROLE_LIST_FAILURE'

// Change role status.
export const REQUEST_ROLE_PERMISSIONS_POSTS = 'REQUEST_ROLE_PERMISSIONS_POSTS'
export const REQUEST_ROLE_PERMISSIONS_SUCCESS = 'REQUEST_ROLE_PERMISSIONS_SUCCESS'
export const REQUEST_ROLE_PERMISSIONS_FAILURE = 'REQUEST_ROLE_PERMISSIONS_FAILURE'

// New/edit role info.
export const UPDATE_ROLE_INFO_POSTS = 'UPDATE_ROLE_INFO_POSTS'
export const UPDATE_ROLE_INFO_SUCCESS = 'UPDATE_ROLE_INFO_SUCCESS'
export const UPDATE_ROLE_INFO_FAILURE = 'UPDATE_ROLE_INFO_FAILURE'

// Get role info.
export const REQUEST_ROLE_ITEM_POSTS = 'REQUEST_ROLE_ITEM_POSTS'
export const REQUEST_ROLE_ITEM_SUCCESS = 'REQUEST_ROLE_ITEM_SUCCESS'
export const REQUEST_ROLE_ITEM_FAILURE = 'REQUEST_ROLE_ITEM_FAILURE'

export const RESET_ROLE_INFO = 'RESET_ROLE_INFO'

/**
 * Actions
 */
// Role list.
export const requestRoleListPosts = () => {
  return {
    type: REQUEST_ROLE_LIST_POSTS
  }
}

export const requestRoleListSuccess = (data) => {
  return {
    type: REQUEST_ROLE_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestRoleListFailure = () => {
  return {
    type: REQUEST_ROLE_LIST_FAILURE
  }
}

// Change role status.
export const requestRolePermissionsPosts = () => {
  return {
    type: REQUEST_ROLE_PERMISSIONS_POSTS
  }
}

export const requestRolePermissionsSuccess = (data) => {
  return {
    type: REQUEST_ROLE_PERMISSIONS_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestRolePermissionsFailure = () => {
  return {
    type: REQUEST_ROLE_PERMISSIONS_FAILURE
  }
}

// New/edit role info.
export const updateRoleInfoPosts = () => {
  return {
    type: UPDATE_ROLE_INFO_POSTS
  }
}

export const updateRoleInfoSuccess = (data) => {
  return {
    type: UPDATE_ROLE_INFO_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateRoleInfoFailure = () => {
  return {
    type: UPDATE_ROLE_INFO_FAILURE
  }
}

// Get role info.
export const requestRoleItemPosts = () => {
  return {
    type: REQUEST_ROLE_ITEM_POSTS
  }
}

export const requestRoleItemSuccess = (data) => {
  return {
    type: REQUEST_ROLE_ITEM_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestRoleItemFailure = () => {
  return {
    type: REQUEST_ROLE_ITEM_FAILURE
  }
}

export const resetRoleInfo = () => {
  return {
    type: RESET_ROLE_INFO
  }
}

/**
 * Async method
 */
export const fetchRole = () => {
  return (dispatch) => {
    dispatch(requestRoleListPosts())

    return requestAuthInstance.get(ApiList.role.index, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestRoleListSuccess(res.data.data))
        } else {
          dispatch(requestRoleListFailure())
        }
      })
      .catch(err => {
        dispatch(requestRoleListFailure())
        console.log(err)
      })
  }
}

export const fetchRolePermissions = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestRolePermissionsPosts())

    return requestAuthInstance.get(ApiList.role.rolePermission, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...infos,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestRolePermissionsSuccess(res.data.data))
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestRolePermissionsFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestRolePermissionsFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const updateRoleInfo = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(updateRoleInfoPosts())

    return requestAuthInstance.post(infos.type === 'new' ? ApiList.role.new : ApiList.role.edit, qs.stringify(infos), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(updateRoleInfoSuccess(res.data.data))
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(updateRoleInfoFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(updateRoleInfoFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const fetchRoleItem = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestRoleItemPosts())

    return requestAuthInstance.get(ApiList.role.roleInfo, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...infos
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestRoleItemSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestRoleItemFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestRoleItemFailure())
        errorCallback && errorCallback()
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
const ADMIN_USERS_ACTION_HANDLERS = {
  // Role list.
  [REQUEST_ROLE_LIST_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_ROLE_LIST_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      roleList: action.payload.data
    })
  },
  [REQUEST_ROLE_LIST_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // Change role status
  [REQUEST_ROLE_PERMISSIONS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_ROLE_PERMISSIONS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
    })
  },
  [REQUEST_ROLE_PERMISSIONS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // New/edit role info.
  [UPDATE_ROLE_INFO_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [UPDATE_ROLE_INFO_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
    })
  },
  [UPDATE_ROLE_INFO_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // Get role info.
  [REQUEST_ROLE_ITEM_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_ROLE_ITEM_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      roleInfo: action.payload.data
    })
  },
  [REQUEST_ROLE_ITEM_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [RESET_ROLE_INFO]: state => {
    return ({
      ...state,
      roleInfo: {
        permissionList: [],
        roleItem: {
          name: '',
          permission: []
        }
      }
    })
  },
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  roleList: [],
  roleInfo: {
    permissionList: [],
    roleItem: {
      name: '',
      permission: []
    }
  }
}

export default function UserReducer (state = initialState, action) {
  const handler = ADMIN_USERS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
