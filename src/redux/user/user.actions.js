import userActionTypes from './user.types';

export const signUpUserStart = (credentials) => {
    return {
        type: userActionTypes.SIGNUP_USER_START,
        payload: credentials
    }
}

export const signUpUserSuccess = (user) => {
    return {
        type: userActionTypes.SIGNUP_USER_SUCCESS,
        payload: user
    }
}

export const signUpUserFailure = (error) => {
    return {
        type: userActionTypes.SIGNUP_USER_FAILURE,
        payload: error
    }
}

export const checkUserSession = () => {
    return {
        type: userActionTypes.CHECK_USER_SESSION
    }
}

export const signInUserStart = (credentials) => {
    return {
        type: userActionTypes.SIGNIN_USER_START,
        payload: credentials
    }
}

export const signInUserSuccess = (user) => {
    return {
        type: userActionTypes.SIGNIN_USER_SUCCESS,
        payload: user
    }
}

export const signInUserFailure = (error) => {
    return {
        type: userActionTypes.SIGNIN_USER_FAILURE,
        payload: error
    }
}

export const signOutUserStart = () => {
    return {
        type: userActionTypes.SIGNOUT_USER_START,
    }
}

export const signOutUserSuccess = () => {
    return {
        type: userActionTypes.SIGNOUT_USER_SUCCESS,
    }
}

export const signOutUserFailure = (error) => {
    return {
        type: userActionTypes.SIGNOUT_USER_FAILURE,
        payload: error
    }
}