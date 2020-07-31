import companyActionTypes from './company.types';

export const getCompanyDataStart = (company) => {
    return {
        type: companyActionTypes.GET_COMPANY_DATA_START,
        payload: company
    }
}

export const getCompanyDataSuccess = (company) => {
    return {
        type: companyActionTypes.GET_COMPANY_DATA_SUCCESS,
        payload: company
    }
}

export const getCompanyDataFailure = (error) => {
    return {
        type: companyActionTypes.GET_COMPANY_DATA_FAILURE,
        payload: error
    }
}

export const removeCurrentCompany = () => {
    return {
        type: companyActionTypes.REMOVE_CURRENT_COMPANY
    }
}