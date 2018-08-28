import qs from 'qs'
import store from 'store'
import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
// Account list.
export const REQUEST_ACCOUNT_LIST_POSTS = 'REQUEST_ACCOUNT_LIST_POSTS'
export const REQUEST_ACCOUNT_LIST_SUCCESS = 'REQUEST_ACCOUNT_LIST_SUCCESS'
export const REQUEST_ACCOUNT_LIST_FAILURE = 'REQUEST_ACCOUNT_LIST_FAILURE'

// Change account status.
export const CHANGE_ACCOUNT_STATUS_POSTS = 'CHANGE_ACCOUNT_STATUS_POSTS'
export const CHANGE_ACCOUNT_STATUS_SUCCESS = 'CHANGE_ACCOUNT_STATUS_SUCCESS'
export const CHANGE_ACCOUNT_STATUS_FAILURE = 'CHANGE_ACCOUNT_STATUS_FAILURE'

// Reset account password.
export const RESET_ACCOUNT_PASSWORD_POSTS = 'RESET_ACCOUNT_PASSWORD_POSTS'
export const RESET_ACCOUNT_PASSWORD_SUCCESS = 'RESET_ACCOUNT_PASSWORD_SUCCESS'
export const RESET_ACCOUNT_PASSWORD_FAILURE = 'RESET_ACCOUNT_PASSWORD_FAILURE'

// New/edit account info.
export const UPDATE_ACCOUNT_INFO_POSTS = 'UPDATE_ACCOUNT_INFO_POSTS'
export const UPDATE_ACCOUNT_INFO_SUCCESS = 'UPDATE_ACCOUNT_INFO_SUCCESS'
export const UPDATE_ACCOUNT_INFO_FAILURE = 'UPDATE_ACCOUNT_INFO_FAILURE'

// Get account info.
export const REQUEST_ACCOUNT_ITEM_POSTS = 'REQUEST_ACCOUNT_ITEM_POSTS'
export const REQUEST_ACCOUNT_ITEM_SUCCESS = 'REQUEST_ACCOUNT_ITEM_SUCCESS'
export const REQUEST_ACCOUNT_ITEM_FAILURE = 'REQUEST_ACCOUNT_ITEM_FAILURE'

// Check email's uniqueness
export const CHECK_ACCOUNT_EMIAL_UNIQUE_POSTS = 'CHECK_ACCOUNT_EMIAL_UNIQUE_POSTS'
export const CHECK_ACCOUNT_EMIAL_UNIQUE_SUCCESS = 'CHECK_ACCOUNT_EMIAL_UNIQUE_SUCCESS'
export const CHECK_ACCOUNT_EMIAL_UNIQUE_FAILURE = 'CHECK_ACCOUNT_EMIAL_UNIQUE_FAILURE'

/**
 * Actions
 */
// Account list.
export const requestAccountListPosts = () => {
  return {
    type: REQUEST_ACCOUNT_LIST_POSTS
  }
}

export const requestAccountListSuccess = (data) => {
  return {
    type: REQUEST_ACCOUNT_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestAccountListFailure = () => {
  return {
    type: REQUEST_ACCOUNT_LIST_FAILURE
  }
}

// Change account status.
export const changeAccountStatusPosts = () => {
  return {
    type: CHANGE_ACCOUNT_STATUS_POSTS
  }
}

export const changeAccountStatusSuccess = (data) => {
  return {
    type: CHANGE_ACCOUNT_STATUS_SUCCESS,
    payload: {
      data
    }
  }
}

export const changeAccountStatusFailure = () => {
  return {
    type: CHANGE_ACCOUNT_STATUS_FAILURE
  }
}

// Reset account password.
export const resetAccountPasswordPosts = () => {
  return {
    type: RESET_ACCOUNT_PASSWORD_POSTS
  }
}

export const resetAccountPasswordSuccess = (data) => {
  return {
    type: RESET_ACCOUNT_PASSWORD_SUCCESS,
    payload: {
      data
    }
  }
}

export const resetAccountPasswordFailure = () => {
  return {
    type: RESET_ACCOUNT_PASSWORD_FAILURE
  }
}

// New/edit account info.
export const updateAccountInfoPosts = () => {
  return {
    type: UPDATE_ACCOUNT_INFO_POSTS
  }
}

export const updateAccountInfoSuccess = (data) => {
  return {
    type: UPDATE_ACCOUNT_INFO_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateAccountInfoFailure = () => {
  return {
    type: UPDATE_ACCOUNT_INFO_FAILURE
  }
}

// Get account info.
export const requestAccountItemPosts = () => {
  return {
    type: REQUEST_ACCOUNT_ITEM_POSTS
  }
}

export const requestAccountItemSuccess = (data) => {
  return {
    type: REQUEST_ACCOUNT_ITEM_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestAccountItemFailure = () => {
  return {
    type: REQUEST_ACCOUNT_ITEM_FAILURE
  }
}

// Check email's uniqueness
export const checkAccountEmailUniquePosts = () => {
  return {
    type: CHECK_ACCOUNT_EMIAL_UNIQUE_POSTS
  }
}

export const checkAccountEmailUniqueSuccess = (data) => {
  return {
    type: CHECK_ACCOUNT_EMIAL_UNIQUE_SUCCESS,
    payload: {
      data
    }
  }
}

export const checkAccountEmailUniqueFailure = () => {
  return {
    type: CHECK_ACCOUNT_EMIAL_UNIQUE_FAILURE
  }
}
/**
 * Async method
 */
export const fetchAccount = () => {
  return (dispatch) => {
    dispatch(requestAccountListPosts())

    return requestAuthInstance.get(ApiList.account.index, {
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
          dispatch(requestAccountListSuccess(res.data.data))
        } else {
          dispatch(requestAccountListFailure())
        }
      })
      .catch(err => {
        dispatch(requestAccountListFailure())
        console.log(err)
      })
  }
}

export const changeAccountStatus = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(changeAccountStatusPosts())

    return requestAuthInstance.get(ApiList.account.changeStatus, {
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
          dispatch(changeAccountStatusSuccess(res.data.data))
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(changeAccountStatusFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(changeAccountStatusFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const resetAccountPassword = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(resetAccountPasswordPosts())

    return requestAuthInstance.get(ApiList.account.resetPsw, {
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
          dispatch(resetAccountPasswordSuccess(res.data.data))
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(resetAccountPasswordFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(resetAccountPasswordFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const updateAccountInfo = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(updateAccountInfoPosts())

    return requestAuthInstance.post(infos.type === 'new' ? ApiList.account.new : ApiList.account.edit, qs.stringify(infos), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(updateAccountInfoSuccess(res.data.data))
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(updateAccountInfoFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(updateAccountInfoFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const fetchAccountItem = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAccountItemPosts())

    return requestAuthInstance.get(ApiList.account.accountInfo, {
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
          dispatch(requestAccountItemSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestAccountItemFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(requestAccountItemFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const fetchAccountEmailUnique = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(checkAccountEmailUniquePosts())

    return requestAuthInstance.get(ApiList.account.checkEmailUnique, {
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
          dispatch(checkAccountEmailUniqueSuccess(res.data.data))
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(checkAccountEmailUniqueFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(checkAccountEmailUniqueFailure())
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
 * Tools func
 */
let changeAccountItem = (accountList, accountItem) => {
  let newAccountList = accountList.map((item, index) => {
    const {
      id
    } = item
    if (id === accountItem.id) {
      return accountItem
    }
    return item
  })

  return newAccountList
}

/**
 * Action Handlers
 */
const ADMIN_USERS_ACTION_HANDLERS = {
  // Account list.
  [REQUEST_ACCOUNT_LIST_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_ACCOUNT_LIST_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      accountList: action.payload.data
    })
  },
  [REQUEST_ACCOUNT_LIST_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // Change account status
  [CHANGE_ACCOUNT_STATUS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [CHANGE_ACCOUNT_STATUS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      accountList: changeAccountItem(state.accountList, action.payload.data)
    })
  },
  [CHANGE_ACCOUNT_STATUS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // Reset account password
  [RESET_ACCOUNT_PASSWORD_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [RESET_ACCOUNT_PASSWORD_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      accountList: changeAccountItem(state.accountList, action.payload.data)
    })
  },
  [RESET_ACCOUNT_PASSWORD_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // New/edit account info.
  [UPDATE_ACCOUNT_INFO_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [UPDATE_ACCOUNT_INFO_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
    })
  },
  [UPDATE_ACCOUNT_INFO_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // Get account info.
  [REQUEST_ACCOUNT_ITEM_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_ACCOUNT_ITEM_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      accountInfo: action.payload.data
    })
  },
  [REQUEST_ACCOUNT_ITEM_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  // Check email's uniqueness
  [CHECK_ACCOUNT_EMIAL_UNIQUE_POSTS]: (state) => {
    return ({
      ...state,
      emailChecking: true
    })
  },
  [CHECK_ACCOUNT_EMIAL_UNIQUE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      emailChecking: false,
    })
  },
  [CHECK_ACCOUNT_EMIAL_UNIQUE_FAILURE]: (state) => {
    return ({
      ...state,
      emailChecking: false
    })
  },
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  emailChecking: false,
  accountList: [],
  accountInfo: {
    roleList: [],
    accountItem: {
      accountEmail: '',
      accountName: '',
      accountRole: '1'
    }
  }
}

export default function UserReducer (state = initialState, action) {
  const handler = ADMIN_USERS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
