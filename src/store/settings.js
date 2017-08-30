import store from 'store'

/**
 * Constants
 */
export const SIDER_COLLAPSED_CHANGE = 'SIDER_COLLAPSED_CHANGE'
export const SIDER_VISIBLE_CHANGE = 'SIDER_VISIBLE_CHANGE'
/**
 * Actions
 */
export const siderCollapsedChange = () => {
  return {
    type: SIDER_COLLAPSED_CHANGE
  }
}

export const siderHideChange = () => {
  return {
    type: SIDER_VISIBLE_CHANGE
  }
}
/**
 * Async Method
 */
export const siderChange = () => {
  return (dispatch, getState) => {
    // console.log(collapsed)
    let siderCollapsedStatus = getState().settings && getState().settings.siderCollapsed
    dispatch(siderCollapsedChange())
    store.set('sider_collapsed', !siderCollapsedStatus)
  }
}

export const siderVisibleChange = () => {
  return (dispatch, getState) => {
    // console.log(collapsed)
    let siderVisibleStatus = getState().settings && getState().settings.siderVisible
    dispatch(siderHideChange())
    store.set('sider_collapsed_visible', !siderVisibleStatus)
  }
}

// export const actions = {
// }

/**
 * Action Handlers
 */
const SETTINGS_ACTION_HANDLERS = {
  [SIDER_COLLAPSED_CHANGE]: (state) => {
    return ({
      ...state,
      siderCollapsed: !state.siderCollapsed,
    })
  },
  [SIDER_VISIBLE_CHANGE]: (state) => {
    return ({
      ...state,
      siderVisible: !state.siderVisible
    })
  },
}

/**
 * Reducers
 */
const initialState = {
  isLoading: false,
  siderCollapsed: store.get('sider_collapsed') || false,
  siderVisible: store.get('sider_collapsed_visible') || false,
}
export default function settingsReducer (state = initialState, action) {
  const handler = SETTINGS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
