import companyActionTypes from './company.types';
import userActionTypes from '../user/user.types'
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.util';
import { getCompanyDataSuccess, 
         getCompanyDataFailure, 
         removeCurrentCompany, 
         updateCompanySuccess, 
         updateCompanyFailure,
         getCompanyEmployeeSuccess,
         getCompanyEmployeeFailure
        } from './company.actions'


export function* getCompanyData({payload}) {
    try {
        const companyCollectionSnapshot = yield firestore.collection('companies').get();
        yield console.log(companyCollectionSnapshot);
        const foundCompany = yield companyCollectionSnapshot.docs.filter(doc => doc.data().companyName === payload)[0];
        const companyObj = {id: foundCompany.id , ...foundCompany.data()}
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

function* getEmployees({payload}) {
    try {
        const employees = [];
        for(let employeeID in payload.employees) {
            employees.push(employeeID);
        }
        const promiseArray = employees.map(async (employeeID) => {
            const userRef = firestore.doc(`users/${employeeID}`);
            const userSnapshot = await userRef.get();
            const employeeData = userSnapshot.data();
            return employeeData;
        })
        const promisedEmployees = yield Promise.all(promiseArray);
        yield put(getCompanyEmployeeSuccess(promisedEmployees))
    } catch (error) {
        yield put(getCompanyEmployeeFailure(error.message))
    }
    

}

function* onGetCompanyEmployeeStart() {
    yield takeLatest(companyActionTypes.GET_COMPANY_EMPLOYEES_START, getEmployees)
}

function* updateCompany({payload}) {
    try {
        const { id, email, companyId } = payload;
        const companyRef = firestore.doc(`companies/${companyId}`);
        yield companyRef.set({
            employees: {
                [id] : {email: email}
            }
        }, {merge: true})
        const companySnapshot = yield companyRef.get();
        const companyData = { ...companySnapshot.data()}
        yield put(updateCompanySuccess(companyData));
    } catch (error) {
       yield put(updateCompanyFailure(error.message))
    }  
}

function* onUpdateCompanyStart() {
    yield takeLatest(companyActionTypes.UPDATE_COMPANY_START, updateCompany)
}

function* companySagas() {
    yield all([call(onGetCompanyDataStart), call(onSignOutUserStart), call(onGetCompanyEmployeeStart), call(onUpdateCompanyStart)])
}

export default companySagas;