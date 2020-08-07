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

export const getCompanyEmployeeStart = (company) => {
    return {
        type: companyActionTypes.GET_COMPANY_EMPLOYEES_START,
        payload: company
    }
}

export const getCompanyEmployeeSuccess = (employees) => {
    return {
        type: companyActionTypes.GET_COMPANY_EMPLOYEES_SUCCESS,
        payload: employees
    }
}

export const getCompanyEmployeeFailure = (error) => {
    return {
        type: companyActionTypes.GET_COMPANY_EMPLOYEES_FAILURE,
        payload: error
    }
}

export const updateCompanyStart = (newData) => {
    return {
        type:companyActionTypes.UPDATE_COMPANY_START,
        payload: newData
    }
}

export const updateCompanySuccess = (company) => {
    return {
        type: companyActionTypes.UPDATE_COMPANY_SUCCESS,
        payload: company
    }
}

export const updateCompanyFailure = (error) => {
    return {
        type: companyActionTypes.UPDATE_COMPANY_FAILURE,
        payload: error
    }
}