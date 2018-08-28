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
export const REQUEST_PUBLISH_LIST_POSTS = 'REQUEST_PUBLISH_LIST_POSTS'
export const REQUEST_PUBLISH_LIST_SUCCESS = 'REQUEST_PUBLISH_LIST_SUCCESS'
export const REQUEST_PUBLISH_LIST_FAILURE = 'REQUEST_PUBLISH_LIST_FAILURE'

export const CHANGE_PUBLISH_STATUS_POSTS = 'CHANGE_PUBLISH_STATUS_POSTS'
export const CHANGE_PUBLISH_STATUS_SUCCESS = 'CHANGE_PUBLISH_STATUS_SUCCESS'
export const CHANGE_PUBLISH_STATUS_FAILURE = 'CHANGE_PUBLISH_STATUS_FAILURE'

export const CHANGE_PUBLISH_TYPE_POSTS = 'CHANGE_PUBLISH_TYPE_POSTS'
export const CHANGE_PUBLISH_TYPE_SUCCESS = 'CHANGE_PUBLISH_TYPE_SUCCESS'
export const CHANGE_PUBLISH_TYPE_FAILURE = 'CHANGE_PUBLISH_TYPE_FAILURE'

export const REQUEST_PUBLISH_INFO_POSTS = 'REQUEST_PUBLISH_INFO_POSTS'
export const REQUEST_PUBLISH_INFO_SUCCESS = 'REQUEST_PUBLISH_INFO_SUCCESS'
export const REQUEST_PUBLISH_INFO_FAILURE = 'REQUEST_PUBLISH_INFO_FAILURE'

export const UPDATE_PUBLISH_INFO_POSTS = 'UPDATE_PUBLISH_INFO_POSTS'
export const UPDATE_PUBLISH_INFO_SUCCESS = 'UPDATE_PUBLISH_INFO_SUCCESS'
export const UPDATE_PUBLISH_INFO_FAILURE = 'UPDATE_PUBLISH_INFO_FAILURE'

export const REQUEST_PUBLISH_GOODS_POSTS = 'REQUEST_PUBLISH_GOODS_POSTS'
export const REQUEST_PUBLISH_GOODS_SUCCESS = 'REQUEST_PUBLISH_GOODS_SUCCESS'
export const REQUEST_PUBLISH_GOODS_FAILURE = 'REQUEST_PUBLISH_GOODS_FAILURE'

export const REQUEST_PUBLISH_USERS_POSTS = 'REQUEST_PUBLISH_USERS_POSTS'
export const REQUEST_PUBLISH_USERS_SUCCESS = 'REQUEST_PUBLISH_USERS_SUCCESS'
export const REQUEST_PUBLISH_USERS_FAILURE = 'REQUEST_PUBLISH_USERS_FAILURE'

export const REQUEST_PUBLISH_TAGS_POSTS = 'REQUEST_PUBLISH_TAGS_POSTS'
export const REQUEST_PUBLISH_TAGS_SUCCESS = 'REQUEST_PUBLISH_TAGS_SUCCESS'
export const REQUEST_PUBLISH_TAGS_FAILURE = 'REQUEST_PUBLISH_TAGS_FAILURE'

export const REQUEST_PUBLISH_BIND_INFOS_POSTS = 'REQUEST_PUBLISH_BIND_INFOS_POSTS'
export const REQUEST_PUBLISH_BIND_INFOS_SUCCESS = 'REQUEST_PUBLISH_BIND_INFOS_SUCCESS'
export const REQUEST_PUBLISH_BIND_INFOS_FAILURE = 'REQUEST_PUBLISH_BIND_INFOS_FAILURE'

export const REQUEST_PUBLISH_BIND_GOODS_POSTS = 'REQUEST_PUBLISH_BIND_GOODS_POSTS'
export const REQUEST_PUBLISH_BIND_GOODS_SUCCESS = 'REQUEST_PUBLISH_BIND_GOODS_SUCCESS'
export const REQUEST_PUBLISH_BIND_GOODS_FAILURE = 'REQUEST_PUBLISH_BIND_GOODS_FAILURE'

export const RESET_PUBLISH_INFO = 'RESET_PUBLISH_INFO'

/**
 * Actions
 */
// Request AdZones list.
export const requestAdZonesListPosts = () => {
  return {
    type: REQUEST_PUBLISH_LIST_POSTS
  }
}

export const requestAdZonesListSuccess = (data) => {
  return {
    type: REQUEST_PUBLISH_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestAdZonesListFailure = () => {
  return {
    type: REQUEST_PUBLISH_LIST_FAILURE
  }
}

// Change adZones status.
export const changeAdZonesStatusPosts = () => {
  return {
    type: CHANGE_PUBLISH_STATUS_POSTS
  }
}

export const changeAdZonesStatusSuccess = (data) => {
  return {
    type: CHANGE_PUBLISH_STATUS_SUCCESS,
    payload: {
      data
    }
  }
}

export const changeAdZonesStatusFailure = () => {
  return {
    type: CHANGE_PUBLISH_STATUS_FAILURE
  }
}

// Change adZones Type.
export const changeAdZonesTypePosts = () => {
  return {
    type: CHANGE_PUBLISH_TYPE_POSTS
  }
}

export const changeAdZonesTypeSuccess = (data) => {
  return {
    type: CHANGE_PUBLISH_TYPE_SUCCESS,
    payload: {
      data
    }
  }
}

export const changeAdZonesTypeFailure = () => {
  return {
    type: CHANGE_PUBLISH_TYPE_FAILURE
  }
}

// Request AdZones info.
export const requestAdZonesInfoPosts = () => {
  return {
    type: REQUEST_PUBLISH_INFO_POSTS
  }
}

export const requestAdZonesInfoSuccess = (data) => {
  return {
    type: REQUEST_PUBLISH_INFO_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestAdZonesInfoFailure = () => {
  return {
    type: REQUEST_PUBLISH_INFO_FAILURE
  }
}

// New/Edit AdZones.
export const updateAdZonesInfoPosts = () => {
  return {
    type: UPDATE_PUBLISH_INFO_POSTS
  }
}

export const updateAdZonesInfoSuccess = (data) => {
  return {
    type: UPDATE_PUBLISH_INFO_SUCCESS
  }
}

export const updateAdZonesInfoFailure = () => {
  return {
    type: UPDATE_PUBLISH_INFO_FAILURE
  }
}

// Request adZones goods.
export const requestAdZonesGoodsPosts = () => {
  return {
    type: REQUEST_PUBLISH_GOODS_POSTS
  }
}

export const requestAdZonesGoodsSuccess = (data) => {
  return {
    type: REQUEST_PUBLISH_GOODS_SUCCESS
  }
}

export const requestAdZonesGoodsFailure = () => {
  return {
    type: REQUEST_PUBLISH_GOODS_FAILURE
  }
}

// Request adZones users.
export const requestAdZonesUsersPosts = () => {
  return {
    type: REQUEST_PUBLISH_USERS_POSTS
  }
}

export const requestAdZonesUsersSuccess = (data) => {
  return {
    type: REQUEST_PUBLISH_USERS_SUCCESS
  }
}

export const requestAdZonesUsersFailure = () => {
  return {
    type: REQUEST_PUBLISH_USERS_FAILURE
  }
}

// Request adZones tags.
export const requestAdZonesTagsPosts = () => {
  return {
    type: REQUEST_PUBLISH_TAGS_POSTS
  }
}

export const requestAdZonesTagsSuccess = (data) => {
  return {
    type: REQUEST_PUBLISH_TAGS_SUCCESS
  }
}

export const requestAdZonesTagsFailure = () => {
  return {
    type: REQUEST_PUBLISH_TAGS_FAILURE
  }
}

// Request adZones bind users.
export const requestAdZonesBindInfosPosts = () => {
  return {
    type: REQUEST_PUBLISH_BIND_INFOS_POSTS
  }
}

export const requestAdZonesBindInfosSuccess = (data) => {
  return {
    type: REQUEST_PUBLISH_BIND_INFOS_POSTS
  }
}

export const requestAdZonesBindInfosFailure = () => {
  return {
    type: REQUEST_PUBLISH_BIND_INFOS_POSTS
  }
}

export const resetAdZonesInfo = () => {
  return {
    type: RESET_PUBLISH_INFO
  }
}

/**
 * Async method
 */
export const fetchAdZonesList = (infos, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAdZonesListPosts())

    return requestAuthInstance.get(ApiList.adZones.index, {
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
          dispatch(requestAdZonesListSuccess(res.data.data))
          successCallback && successCallback(res.data.data.infos)
        } else {
          dispatch(requestAdZonesListFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(requestAdZonesListFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const changeAdZonesStatus = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(changeAdZonesStatusPosts())

    return requestAuthInstance.get(ApiList.adZones.changeStatus, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(changeAdZonesStatusSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(changeAdZonesStatusFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(changeAdZonesStatusFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const changeAdZonesType = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(changeAdZonesTypePosts())

    return requestAuthInstance.get(ApiList.adZones.changeType, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo,
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(changeAdZonesTypeSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(changeAdZonesTypeFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(changeAdZonesTypeFailure())
        errorCallback && errorCallback()
        console.log(err.response)
        console.log(err)
      })
  }
}

export const fetchAdZonesInfo = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAdZonesInfoPosts())

    return requestAuthInstance.get(ApiList.adZones.adZonesInfo, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestAdZonesInfoSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestAdZonesInfoFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(requestAdZonesInfoFailure())
        console.log(err)
      })
  }
}

export const updateAdZones = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(updateAdZonesInfoPosts())

    return requestAuthInstance.post(adZonesInfo.type === 'new' ? ApiList.adZones.new : ApiList.adZones.edit, qs.stringify(adZonesInfo), {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(updateAdZonesInfoSuccess())
          successCallback && successCallback(res.data.msg)
        } else {
          dispatch(updateAdZonesInfoFailure())
          errorCallback && errorCallback(res.data.msg)
        }
      })
      .catch(err => {
        dispatch(updateAdZonesInfoFailure())
        errorCallback && errorCallback()
        console.log(err)
      })
  }
}

export const fetchAdZonesGoods = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAdZonesGoodsPosts())

    return requestAuthInstance.get(ApiList.adZones.adZonesGoods, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestAdZonesGoodsSuccess())
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestAdZonesGoodsFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestAdZonesGoodsFailure())
        console.log(err)
      })
  }
}

export const fetchAdZonesUsers = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAdZonesUsersPosts())

    return requestAuthInstance.get(ApiList.adZones.adZonesUsers, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestAdZonesUsersSuccess())
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestAdZonesUsersFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestAdZonesUsersFailure())
        console.log(err)
      })
  }
}

export const fetchAdZonesTags = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAdZonesTagsPosts())

    return requestAuthInstance.get(ApiList.adZones.adZonesTags, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestAdZonesTagsSuccess())
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestAdZonesTagsFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestAdZonesTagsFailure())
        console.log(err)
      })
  }
}

export const fetchAdZonesBindInfos = (adZonesInfo, successCallback, errorCallback) => {
  return (dispatch) => {
    dispatch(requestAdZonesBindInfosPosts())

    return requestAuthInstance.get(ApiList.adZones.adZonesBindInfos, {
      headers: {
        'Authorization': store.get('access_token') || null,
        'User-Id': store.get('user_id') || null
      },
      params: {
        ...adZonesInfo
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestAdZonesBindInfosSuccess())
          successCallback && successCallback(res.data.data)
        } else {
          dispatch(requestAdZonesBindInfosFailure())
          errorCallback && errorCallback()
        }
      })
      .catch(err => {
        dispatch(requestAdZonesBindInfosFailure())
        console.log(err)
      })
  }
}

export const actions = {
}

/**
 * Tools func
 */
let changeAdZonesItem = (adZonesList, adZonesItem) => {
  let newAdZonesList = adZonesList.map((item, index) => {
    const {
      id
    } = item
    if (id === adZonesItem.id) {
      return adZonesItem
    }
    return item
  })

  return newAdZonesList
}

/**
 * Action Handlers
 */
const PUBLISH_ACTION_HANDLERS = {
  [REQUEST_PUBLISH_LIST_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_PUBLISH_LIST_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      listInfo: action.payload.data.infos,
      adZonesList: action.payload.data.list
    })
  },
  [REQUEST_PUBLISH_LIST_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [CHANGE_PUBLISH_STATUS_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [CHANGE_PUBLISH_STATUS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      adZonesList: changeAdZonesItem(state.adZonesList, action.payload.data)
    })
  },
  [CHANGE_PUBLISH_STATUS_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [CHANGE_PUBLISH_TYPE_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [CHANGE_PUBLISH_TYPE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      adZonesList: changeAdZonesItem(state.adZonesList, action.payload.data)
    })
  },
  [CHANGE_PUBLISH_TYPE_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_PUBLISH_INFO_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_PUBLISH_INFO_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      adZonesInfo: action.payload.data
    })
  },
  [REQUEST_PUBLISH_INFO_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [UPDATE_PUBLISH_INFO_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [UPDATE_PUBLISH_INFO_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [UPDATE_PUBLISH_INFO_FAILURE]: (state) => {
    return ({
      ...state,
      isLoading: false
    })
  },
  [REQUEST_PUBLISH_GOODS_POSTS]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_GOODS_SUCCESS]: (state, action) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_GOODS_FAILURE]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_USERS_POSTS]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_USERS_SUCCESS]: (state, action) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_USERS_FAILURE]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_TAGS_POSTS]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_TAGS_SUCCESS]: (state, action) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_TAGS_FAILURE]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_BIND_INFOS_POSTS]: (state) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_BIND_INFOS_SUCCESS]: (state, action) => {
    return ({
      ...state,
    })
  },
  [REQUEST_PUBLISH_BIND_INFOS_FAILURE]: (state) => {
    return ({
      ...state,
    })
  },
  [RESET_PUBLISH_INFO]: state => {
    return ({
      ...state,
      adZonesInfo: {
        adZones_name: '',
        date_range: [],
        goods_list: [],
        is_black_or_white: '2',
        users_list: [],
        tags_list: []
      }
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
  adZonesList: [],
  adZonesInfo: {
    adZones_name: '',
    date_range: [],
    goods_list: [],
    is_black_or_white: '2',
    users_list: [],
    tags_list: []
  }
}

export default function adZonesAdZonesReducer (state = initialState, action) {
  const handler = PUBLISH_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
