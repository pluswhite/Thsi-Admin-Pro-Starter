//
// Constants
//
export const DASHBOARD_INCREMENT = 'DASHBOARD_INCREMENT'
export const DASHBOARD_DOUBLE_ASYNC = 'DASHBOARD_DOUBLE_ASYNC'

//
// Actions
//
export function increment (value = 1) {
  return {
    type    : DASHBOARD_INCREMENT,
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
const ADMIN_DASHBOARD_ACTION_HANDLERS = {
  [DASHBOARD_INCREMENT]: (state, action) => {
    return ({
      ...state,
      counter: state.counter + action.payload
    })
  },
  [DASHBOARD_DOUBLE_ASYNC]: (state, action) => {
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

export default function profileReducer (state = initialState, action) {
  const handler = ADMIN_DASHBOARD_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
