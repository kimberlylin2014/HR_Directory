import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    revealErrorMessage: false,
    isLoading: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.SIGNUP_USER_START:
        case userActionTypes.SIGNIN_USER_START:
        case userActionTypes.SIGNOUT_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case userActionTypes.SIGNUP_USER_SUCCESS:
        case userActionTypes.SIGNIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                revealErrorMessage: false,
                currentUser: action.payload
            }
        case userActionTypes.SIGNOUT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,        
                revealErrorMessage: false,
                currentUser: null
            }
        case userActionTypes.SIGNUP_USER_FAILURE:
        case userActionTypes.SIGNIN_USER_FAILURE:
        case userActionTypes.SIGNOUT_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                revealErrorMessage: action.payload,
                currentUser: null
            }
        default: 
            return state;
    }
}


export default userReducer;