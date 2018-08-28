import { requestAuthInstance, ApiList } from 'vstore/auth'
import store from 'store'

/**
 * Constants
 */
export const REQUEST_PROVINCE_LIST_POSTS = 'REQUEST_PROVINCE_LIST_POSTS'
export const REQUEST_PROVINCE_LIST_SUCCESS = 'REQUEST_PROVINCE_LIST_SUCCESS'
export const REQUEST_PROVINCE_LIST_FAILURE = 'REQUEST_PROVINCE_LIST_FAILURE'

export const REQUEST_CITY_LIST_POSTS = 'REQUEST_CITY_LIST_POSTS'
export const REQUEST_CITY_LIST_SUCCESS = 'REQUEST_CITY_LIST_SUCCESS'
export const REQUEST_CITY_LIST_FAILURE = 'REQUEST_CITY_LIST_FAILURE'

export const REQUEST_PLATEFORM_LIST_POSTS = 'REQUEST_PLATEFORM_LIST_POSTS'
export const REQUEST_PLATEFORM_LIST_SUCCESS = 'REQUEST_PLATEFORM_LIST_SUCCESS'
export const REQUEST_PLATEFORM_LIST_FAILURE = 'REQUEST_PLATEFORM_LIST_FAILURE'

export const REQUEST_ORDER_TYPE_POSTS = 'REQUEST_ORDER_TYPE_POSTS'
export const REQUEST_ORDER_TYPE_SUCCESS = 'REQUEST_ORDER_TYPE_SUCCESS'
export const REQUEST_ORDER_TYPE_FAILURE = 'REQUEST_ORDER_TYPE_FAILURE'
/**
 * Actions
 */
export const requestProvinceListPosts = () => {
  return {
    type: REQUEST_PROVINCE_LIST_POSTS
  }
}

export const requestProvinceListSuccess = data => {
  return {
    type: REQUEST_PROVINCE_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestProvinceListFailure = () => {
  return {
    type: REQUEST_PROVINCE_LIST_FAILURE
  }
}

export const requestCityListPosts = idx => {
  return {
    type: REQUEST_CITY_LIST_POSTS,
    payload: {
      idx
    }
  }
}

export const requestCityListSuccess = (data, idx) => {
  return {
    type: REQUEST_CITY_LIST_SUCCESS,
    payload: {
      data,
      idx
    }
  }
}

export const requestCityListFailure = () => {
  return {
    type: REQUEST_CITY_LIST_FAILURE
  }
}

export const requestPlateformListPosts = () => {
  return {
    type: REQUEST_PLATEFORM_LIST_POSTS
  }
}

export const requestPlateformListSuccess = data => {
  return {
    type: REQUEST_PLATEFORM_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestPlateformListFailure = () => {
  return {
    type: REQUEST_PLATEFORM_LIST_FAILURE
  }
}

export const requestOrderTypePosts = () => {
  return {
    type: REQUEST_ORDER_TYPE_POSTS
  }
}

export const requestOrderTypeSuccess = data => {
  return {
    type: REQUEST_ORDER_TYPE_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestOrderTypeFailure = () => {
  return {
    type: REQUEST_ORDER_TYPE_FAILURE
  }
}

/**
 * Async method
 */
export const getProvinceList = (successCallback, failCallback) => {
  return dispatch => {
    dispatch(requestProvinceListPosts())
    return requestAuthInstance
      .get(ApiList.reports.provinceList, {
        headers: {
          Authorization: store.get('access_token') || null,
          'User-Id': store.get('user_id') || null
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestProvinceListSuccess(res.data.data))
          successCallback && successCallback()
        } else {
          dispatch(requestProvinceListFailure())
          failCallback && failCallback()
        }
      })
      .catch(err => {
        dispatch(requestProvinceListFailure())
        failCallback && failCallback()
        console.log(err)
      })
  }
}
export const getCityList = (provinceItem, successCallback, failCallback) => {
  const { value, idx } = provinceItem
  return dispatch => {
    dispatch(requestCityListPosts(idx))
    return requestAuthInstance
      .get(ApiList.reports.cityList, {
        headers: {
          Authorization: store.get('access_token') || null,
          'User-Id': store.get('user_id') || null
        },
        params: {
          value,
          rnd: Date.now()
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestCityListSuccess(res.data.data, idx))
          successCallback && successCallback()
        } else {
          dispatch(requestCityListFailure())
          failCallback && failCallback()
        }
      })
      .catch(err => {
        dispatch(requestCityListFailure())
        failCallback && failCallback()
        console.log(err)
      })
  }
}

export const getPlateformList = () => {
  return dispatch => {
    dispatch(requestPlateformListPosts())
    return requestAuthInstance
      .get(ApiList.reports.plateformList, {
        headers: {
          Authorization: store.get('access_token') || null,
          'User-Id': store.get('user_id') || null
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestPlateformListSuccess(res.data.data))
        } else {
          dispatch(requestPlateformListFailure())
        }
      })
      .catch(err => {
        dispatch(requestPlateformListFailure())
        console.log(err)
      })
  }
}

export const getOrderType = () => {
  return dispatch => {
    dispatch(requestOrderTypePosts())
    return requestAuthInstance
      .get(ApiList.reports.orderTypeList, {
        headers: {
          Authorization: store.get('access_token') || null,
          'User-Id': store.get('user_id') || null
        }
      })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestOrderTypeSuccess(res.data.data))
        } else {
          dispatch(requestOrderTypeFailure())
        }
      })
      .catch(err => {
        dispatch(requestOrderTypeFailure())
        console.log(err)
      })
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_PROVINCE_LIST_POSTS]: state => {
    return {
      ...state,
      isLoading: true,
      regionList: [
        {
          label: '全国',
          value: '',
          isLeaf: true,
          idx: 0
        }
      ]
    }
  },
  [REQUEST_PROVINCE_LIST_SUCCESS]: (state, action) => {
    let provinceList = action.payload.data
    provinceList.map((item, idx) => {
      item.isLeaf = false
      item.idx = idx + 1
    })
    return {
      ...state,
      isLoading: false,
      regionList: [...state.regionList, ...provinceList]
    }
  },
  [REQUEST_PROVINCE_LIST_FAILURE]: state => {
    return {
      ...state,
      isLoading: false
    }
  },
  [REQUEST_CITY_LIST_POSTS]: (state, action) => {
    const { idx } = action.payload
    let list = state.regionList
    list[idx].children = [
      {
        label: '全省(市)',
        value: ''
      }
    ]
    return {
      ...state,
      isLoading: true,
      regionList: list
    }
  },
  [REQUEST_CITY_LIST_SUCCESS]: (state, action) => {
    const { data, idx } = action.payload
    let list = state.regionList.slice()
    list[idx].loading = false
    list[idx].children = [...list[idx].children, ...data]
    return {
      ...state,
      isLoading: false,
      regionList: list
    }
  },
  [REQUEST_CITY_LIST_FAILURE]: state => {
    return {
      ...state,
      isLoading: false
    }
  },
  [REQUEST_PLATEFORM_LIST_POSTS]: state => {
    return {
      ...state,
      isLoading: true,
      plateformList: [
        {
          label: '全部',
          value: ''
        }
      ]
    }
  },
  [REQUEST_PLATEFORM_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      plateformList: [...state.plateformList, ...action.payload.data]
    }
  },
  [REQUEST_PLATEFORM_LIST_FAILURE]: state => {
    return {
      ...state,
      isLoading: false
    }
  },
  [REQUEST_ORDER_TYPE_POSTS]: state => {
    return {
      ...state,
      isLoading: true,
      orderTypeList: [
        {
          label: '全部',
          value: ''
        }
      ]
    }
  },
  [REQUEST_ORDER_TYPE_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      orderTypeList: [...state.orderTypeList, ...action.payload.data]
    }
  },
  [REQUEST_ORDER_TYPE_FAILURE]: state => {
    return {
      ...state,
      isLoading: false
    }
  }
}

/**
 * Reducer
 */
const initialState = {
  isLoading: false,
  regionList: [],
  plateformList: [],
  orderTypeList: []
}

export default function ReportReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
