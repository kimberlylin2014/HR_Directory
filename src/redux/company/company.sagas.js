import companyActionTypes from './company.types';
import userActionTypes from '../user/user.types'
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.util';
import { getCompanyDataSuccess, getCompanyDataFailure, removeCurrentCompany } from './company.actions'


export function* getCompanyData({payload}) {
    try {
        const companyCollectionSnapshot = yield firestore.collection('companies').get();
        yield console.log(companyCollectionSnapshot);
        const foundCompany = yield companyCollectionSnapshot.docs.filter(doc => doc.data().companyName === payload)[0];
        const companyObj = {id: foundCompany.id , companyName: foundCompany.data().companyName}
        yield put(getCompanyDataSuccess(companyObj))
    } catch (error) {
        yield put(getCompanyDataFailure('Not Found'));
    }
}

export function* onGetCompanyDataStart() {
    yield takeLatest(companyActionTypes.GET_COMPANY_DATA_START, getCompanyData)
}

function* removeCompany() {
    yield put(removeCurrentCompany())
}

function* onSignOutUserStart() {
    yield takeLatest(userActionTypes.SIGNOUT_USER_START, removeCompany);
}
function* companySagas() {
    yield all([call(onGetCompanyDataStart), call(onSignOutUserStart)])
}

export default companySagas;