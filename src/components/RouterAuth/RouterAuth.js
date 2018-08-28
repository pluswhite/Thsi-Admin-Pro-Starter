import {
  connectedRouterRedirect,
  // connectedReduxRedirect
} from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'
import { isObjectOwnEmpty } from 'vutils/Tools'

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => {
    // if (localStorage.getItem('access_token') !== null) {
    //   return true
    // }
    // console.log(state.auth && state.auth.isAuthenticated)
    return (state.auth && state.auth.isAuthenticated)
  },
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',

  // This should be a redux action creator
  redirectAction: routerActions.replace
})

export const permissionIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/error/403',
  authenticatedSelector: (state, ownProps) => {
    const {
      pathname
    } = ownProps.location
    const {
      api_dashboard,
      api_admin,
      api_wx_user,
      api_products,
      api_publish,
      api_order,
      api_report,
      api_tag,
      api_set
    } = state.auth.permissions
    // console.log(pathname)
    // console.log(state.auth.permissions)
    if (isObjectOwnEmpty(state.auth.permissions)) {
      return true
    }
    // Dashboard
    if (/dashboard/.test(pathname)) {
      return (api_dashboard && api_dashboard.has)
    } else if (/account/.test(pathname)) {
      return (api_admin && api_admin.has)
    } else if (/role/.test(pathname)) {
      return (api_admin && api_admin.has && api_admin.sub && api_admin.sub.api_role.list)
    } else if (/user/.test(pathname)) {
      return (api_wx_user && api_wx_user.has)
    } else if (/product/.test(pathname)) {
      return (api_products && api_products.has)
    } else if (/publish/.test(pathname)) {
      return (api_publish && api_publish.has)
    } else if (/order/.test(pathname)) {
      return (api_order && api_order.has)
    } else if (/tag/.test(pathname)) {
      return (api_tag && api_tag.has)
    } else if (/report/.test(pathname)) {
      return (api_report && api_report.has)
    } else if (/setting/.test(pathname)) {
      return (api_set && api_set.has)
    }

    return true
  },
  // A nice display name for this check
  wrapperDisplayName: 'PermissionIsAuthenticated',

  // This should be a redux action creator
  // redirectAction: routerActions.replace
})

export default userIsAuthenticated
