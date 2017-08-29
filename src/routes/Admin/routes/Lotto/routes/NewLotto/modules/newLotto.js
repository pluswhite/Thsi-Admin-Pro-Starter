import {
  requestAuthInstance,
  ApiList
} from 'vstore/auth'

/**
 * Constants
 */
export const REQUEST_LOTTO_LIST_POSTS = 'REQUEST_LOTTO_LIST_POSTS'
export const REQUEST_LOTTO_LIST_SUCCESS = 'REQUEST_LOTTO_LIST_SUCCESS'
export const REQUEST_LOTTO_LIST_FAILURE = 'REQUEST_LOTTO_LIST_FAILURE'

/**
 * Actions
 */
export const requestNewLottoPosts = () => {
  return {
    type: REQUEST_LOTTO_LIST_POSTS
  }
}

export const requestNewLottoSuccess = (data) => {
  return {
    type: REQUEST_LOTTO_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestNewLottoFailure = () => {
  return {
    type: REQUEST_LOTTO_LIST_FAILURE
  }
}

/**
 * Async method
 */
export const fetchNewLotto = () => {
  return (dispatch) => {
    dispatch(requestNewLottoPosts())

    return requestAuthInstance.get(ApiList.lotto.index, {
      params: {
        'rnd': (new Date()).getTime()
      }
    })
      .then(res => {
        if (res.data.status === 'success') {
          dispatch(requestNewLottoSuccess(res.data.data))
        } else {
          dispatch(requestNewLottoFailure())
        }
      })
      .catch(err => {
        dispatch(requestNewLottoFailure())
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
const ADMIN_LOTTO_LIST_ACTION_HANDLERS = {
  [REQUEST_LOTTO_LIST_POSTS]: (state) => {
    return ({
      ...state,
      isLoading: true
    })
  },
  [REQUEST_LOTTO_LIST_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isLoading: false,
      newLotto: action.payload.data.list
    })
  },
  [REQUEST_LOTTO_LIST_FAILURE]: (state) => {
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
  newLotto: []
}

export default function UserReducer (state = initialState, action) {
  const handler = ADMIN_LOTTO_LIST_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
