import { createSelector } from 'reselect';


const userSelector = (state) => state.user;

export const selectCurrentUser = createSelector(
    [userSelector],
    (user) => user.currentUser
)

export const selectErrorMessage = createSelector(
    [userSelector],
    (user) => user.revealErrorMessage
)

export const selectIsUserLoading = createSelector(
    [userSelector],
    (user) => user.isLoading
)

export const selectUserFirstTimeLogIn = createSelector(
    [userSelector],
    (user) => user.currentUser.firstTimeLogin
)
