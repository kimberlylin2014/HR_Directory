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