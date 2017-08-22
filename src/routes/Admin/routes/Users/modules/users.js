import apiConfig from 'vcfg/apiConfig'
import { requestAuthInstance } from 'vstore/auth'
// Constants
//
export const USERS_INCREMENT = 'USERS_INCREMENT'
export const USERS_DOUBLE_ASYNC = 'USERS_DOUBLE_ASYNC'

//
// Actions
//
export function increment (value = 1) {
  return {
    type    : USERS_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  increment
}

//
// Action Handlers
//
const ADMIN_USERS_ACTION_HANDLERS = {
  [USERS_INCREMENT]: (state, action) => {
    return ({
      ...state,
      counter: state.counter + action.payload
    })
  },
  [USERS_DOUBLE_ASYNC]: (state, action) => {
    return ({
      ...state,
      counter: state.counter * 2
    })
  }
}

//
// Reducer
//
const initialState = {
  counter: 0
}

export default function UserReducer (state = initialState, action) {
  const handler = ADMIN_USERS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
