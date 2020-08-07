import companyActionTypes from './company.types';

const INITIAL_STATE = {
    currentCompany: null,
    errorMessage: null,
    isLoading: false,
    employees: null
}

const companyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case companyActionTypes.GET_COMPANY_DATA_START:
        case companyActionTypes.UPDATE_COMPANY_START:
        case companyActionTypes.GET_COMPANY_EMPLOYEES_START:
            return {
                ...state,
                isLoading: true
            }
        case companyActionTypes.GET_COMPANY_DATA_SUCCESS:
        case companyActionTypes.UPDATE_COMPANY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                currentCompany: action.payload
            }
        case companyActionTypes.GET_COMPANY_EMPLOYEES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                employees: action.payload
            }
        case companyActionTypes.GET_COMPANY_DATA_FAILURE:
        case companyActionTypes.UPDATE_COMPANY_FAILURE:
        case companyActionTypes.GET_COMPANY_EMPLOYEES_FAILURE:
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
                errorMessage: null,
                employees: null
            }
        default:
            return state;
    }
}

export default companyReducer;