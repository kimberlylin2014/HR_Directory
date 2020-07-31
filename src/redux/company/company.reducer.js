import companyActionTypes from './company.types';

const INITIAL_STATE = {
    currentCompany: null,
    errorMessage: null,
    isLoading: false
}

const companyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case companyActionTypes.GET_COMPANY_DATA_START:
            return {
                ...state,
                isLoading: false
            }
        case companyActionTypes.GET_COMPANY_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                currentCompany: action.payload
            }
        case companyActionTypes.GET_COMPANY_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        case companyActionTypes.REMOVE_CURRENT_COMPANY:
            return {
                ...state,
                isLoading:false,
                currentCompany: null,
                errorMessage: null
            }
        default:
            return state;
    }
}

export default companyReducer;