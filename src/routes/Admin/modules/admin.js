import store from 'store'

/**
 * Constants
 */
export const SIDER_COLLAPSED_CHANGE = 'SIDER_COLLAPSED_CHANGE'
/**
 * Actions
 */
export const siderCollapsedChange = (collapsed) => {
  return {
    type: SIDER_COLLAPSED_CHANGE,
    payload: {
      collapsed
    }
  }
}
/**
 * Async Method
 */
export const siderChange = (collapsed) => {
  return (dispatch) => {
    // console.log(collapsed)
    dispatch(siderCollapsedChange(collapsed))
    store.set('sider_collpased', collapsed)
  }
}

// export const actions = {
// }

/**
 * Action Handlers
 */
const AUTH_ACTION_HANDLERS = {
  [SIDER_COLLAPSED_CHANGE]: (state, action) => {
    return ({
      ...state,
      siderCollpased: action.payload.collapsed
    })
  },
}

/**
 * Reducers
 */
const initialState = {
  isLoading: false,
  siderCollpased: store.get('sider_collpased') || false
}
export default function adminReducer (state = initialState, action) {
  const handler = AUTH_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
