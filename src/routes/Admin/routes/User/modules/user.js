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
export const REQUEST_USER_POSTS = 'REQUEST_USER_POSTS'
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS'
export const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE'

export const CHANGE_USER_STATUS_POSTS = 'CHANGE_USER_STATUS_POSTS'
export const CHANGE_USER_STATUS_SUCCESS = 'CHANGE_USER_STATUS_SUCCESS'
export const CHANGE_USER_STATUS_FAILURE = 'CHANGE_USER_STATUS_FAILURE'

export const CHANGE_USER_TYPE_POSTS = 'CHANGE_USER_TYPE_POSTS'
export const CHANGE_USER_TYPE_SUCCESS = 'CHANGE_USER_TYPE_SUCCESS'
export const CHANGE_USER_TYPE_FAILURE = 'CHANGE_USER_TYPE_FAILURE'

export const REQUEST_NEW_USER_POSTS = 'REQUEST_NEW_USER_POSTS'
export const REQUEST_NEW_USER_SUCCESS = 'REQUEST_NEW_USER_SUCCESS'
export const REQUEST_NEW_USER_FAILURE = 'REQUEST_NEW_USER_FAILURE'

export const REQUEST_USER_INFO_POSTS = 'REQUEST_USER_INFO_POSTS'
export const REQUEST_USER_INFO_SUCCESS = 'REQUEST_USER_INFO_SUCCESS'
export const REQUEST_USER_INFO_FAILURE = 'REQUEST_USER_INFO_FAILURE'

export const REQUEST_EDIT_USERR_POSTS = 'REQUEST_EDIT_USERR_POSTS'
export const REQUEST_EDIT_USERR_SUCCESS = 'REQUEST_EDIT_USERR_SUCCESS'
export const REQUEST_EDIT_USERR_FAILURE = 'REQUEST_EDIT_USERR_FAILURE'

/**
 * Actions
 */
// Request User list.
export const requestUserListPosts = () => {
  return {
    type: REQUEST_USER_POSTS
  }
}

export const requestUserListSuccess = (data) => {
  return {
    type: REQUEST_USER_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestUserListFailure = () => {
  return {
    type: REQUEST_USER_FAILURE
  }
}

// Change user status.
export const changeUserStatusPosts = () => {
  return {
    type: CHANGE_USER_STATUS_POSTS
  }
}

export const changeUserStatusSuccess = (data) => {
  return {
    type: CHANGE_USER_STATUS_SUCCESS,
    payload: {
      data
    }
  }
}

export const changeUserStatusFailure = () => {
  return {
    type: CHANGE_USER_STATUS_FAILURE
  }
}

// Reset user password.
export const changeUserTypePosts = () => {
  return {
    type: CHANGE_USER_TYPE_POSTS
  }
}

export const changeUserTypeSuccess = (data) => {
  return {
    type: CHANGE_USER_TYPE_SUCCESS,
    payload: {
      data
    }
  }
}

export const changeUserTypeFailure = () => {
  return {
    type: CHANGE_USER_TYPE_FAILURE
  }
}

// New User.
export const requestNewUserPosts = () => {
  return {
    type: REQUEST_NEW_USER_POSTS
  }
}

export const requestNewUserSuccess = (data) => {
  return {
    type: REQUEST_NEW_USER_SUCCESS,
    payload: {
      UserInfo: data
    }
  }
}

export const requestNewUserFailure = () => {
  return {
    type: REQUEST_NEW_USER_FAILURE
  }
}

// Request User info.
export const requestUserInfoPosts = () => {
  return {
    type: REQUEST_EDIT_USERR_POSTS
  }
}

export const requestUserInfoSuccess = (data) => {
  return {
    type: REQUEST_USER_INFO_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestUserInfoFailure = () => {
  return {
    type: REQUEST_USER_INFO_FAILURE
  }
}

// Edit User.
export const requestEditUserPosts = () => {
  return {
    type: REQUEST_EDIT_USERR_POSTS
  }
}

export const requestEditUserSuccess = (data) => {
  return {
    type: REQUEST_EDIT_USERR_SUCCESS
  }
}

export const requestEditUserFailure = () => {
  return {
    type: REQUEST_EDIT_USERR_FAILURE
  }
}

/**
 * Async method
 */
export const fetchUserList = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestUserListPosts())

    return requestAuthInstance.get(ApiList.user.index, {
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
          dispatch(requestUserListSuccess(res.data.data))
          successCallback && successCallback(res.data.data.infos)
        } else {
          dispatch(requestUserListFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestUserListFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const changeUserStatus = (userInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(changeUserStatusPosts())

    return requestAuthInstance.get(ApiList.user.changeStatus, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...userInfo,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(changeUserStatusSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(changeUserStatusFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(changeUserStatusFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const changeUserType = (userInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(changeUserTypePosts())

    return requestAuthInstance.get(ApiList.user.changeType, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...userInfo,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(changeUserTypeSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(changeUserTypeFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(changeUserTypeFailure())
        errorCallback && errorCallback()
        console.log(err.response)
        console.log(err)
      })
  }
}

export const addNewUser = (userInfo) => {
  return (dispatch) => {
    dispatch(requestNewUserPosts())

    return requestAuthInstance.post(ApiList.user.newUser, qs.stringify(userInfo), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestNewUserSuccess())
        } else {
          dispatch(requestNewUserFailure())
        }
      })
      .catch(err => {
        dispatch(requestNewUserFailure())
        console.log(err)
      })
  }
}

export const fetchUserInfo = (userInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestUserInfoPosts())

    return requestAuthInstance.get(ApiList.user.userInfo, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...userInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestUserInfoSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestUserInfoFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestUserInfoFailure())
        console.log(err)
      })
  }
}

export const updateUser = (userInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestEditUserPosts())

    return requestAuthInstance.post(ApiList.user.edit, qs.stringify(userInfo), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestEditUserSuccess())
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(requestEditUserFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(requestEditUserFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const actions = {
}

/**
 * Tools func
 */
let changeUserItem = (userList, userItem) => {
  let newUserList = userList.map((item, index) => {
    const {
      id
    } = item
    if (id === userItem.id) {
      return userItem
    }
    return item
  })

  return newUserList
}

/**
 * Action Handlers
 */
const USER_ACTION_HANDLERS = {
  [REQUEST_USER_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_USER_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      listInfo: action.payload.data.infos,
      userList: action.payload.data.list
    })
  },
  [REQUEST_USER_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [CHANGE_USER_STATUS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [CHANGE_USER_STATUS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      userList: changeUserItem(state.userList, action.payload.data)
    })
  },
  [CHANGE_USER_STATUS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [CHANGE_USER_TYPE_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [CHANGE_USER_TYPE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      userList: changeUserItem(state.userList, action.payload.data)
    })
  },
  [CHANGE_USER_TYPE_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_NEW_USER_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_NEW_USER_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_NEW_USER_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_USER_INFO_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_USER_INFO_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      userInfo: action.payload.data
    })
  },
  [REQUEST_USER_INFO_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_EDIT_USERR_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_EDIT_USERR_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_EDIT_USERR_FAILURE]: (state) => {
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
  listInfo: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  userList: [],
  userInfo: {
    type: '0',
    nickname: '',
    phone: '',
    sex: '0',
    location: '',
    country: ''
  }
}

export default function userUserReducer (state = initialState, action) {
  const handler = USER_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
