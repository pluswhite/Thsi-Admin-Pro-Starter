import store from 'store'

/**
 * Constants
 */
export const SIDER_COLLAPSED_CHANGE = 'SIDER_COLLAPSED_CHANGE'
/**
 * Actions
 */
export const siderCollapsedChange = () => {
  return {
    type: SIDER_COLLAPSED_CHANGE
  }
}
/**
 * Async Method
 */
export const siderChange = () => {
  return (dispatch, getState) => {
    // console.log(collapsed)
    let siderCollpasedStatus = getState().admin && getState().admin.siderCollpased
    // console.log(siderCollpasedStatus)
    dispatch(siderCollapsedChange())
    store.set('sider_collpased', !siderCollpasedStatus)
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
      siderCollpased: !state.siderCollpased
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
