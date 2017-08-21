import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => {
    // if (localStorage.getItem('access_token') !== null) {
    //   return true
    // }
    return (state.auth && state.auth.isAuthenticated)
  },
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',

  // This should be a redux action creator
  redirectAction: routerActions.replace
})

export default userIsAuthenticated
