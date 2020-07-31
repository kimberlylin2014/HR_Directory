import { createSelector } from 'reselect';

const companySelector = (state) => state.company;

export const selectCurrentCompany = createSelector(
    [companySelector],
    (company) => company.currentCompany
)

export const selectIsCompanyLoading = createSelector(
    [companySelector],
    (company) => company.isLoading
)

export const selectCompanyError = createSelector(
    [companySelector],
    (company) => company.errorMessage
)