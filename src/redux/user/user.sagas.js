import userActionTypes from './user.types';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { signUpUserSuccess, 
         signUpUserFailure, 
         signInUserSuccess, 
         signInUserFailure,
         signOutUserSuccess,
         signOutUserFailure,
         updateProfileFormSuccess,
         updateProfileFormFailure
        } from './user.actions';
import { updateCompanyStart } from '../company/company.actions';
import { firestore, auth, getCurrentUser } from '../../firebase/firebase.util';

function* createUserProfileDocument(userAuth, email, company) {
    if(!userAuth){
        return;
    }
    const userRef = yield firestore.doc(`users/${userAuth.uid}`)
    const userSnapshot = yield userRef.get();
    if(!userSnapshot.exists) {
        yield userRef.set({
            id: userAuth.uid,
            email,
            companyId: company.id,
            firstTimeLogin: true,
            image: null,
            imageURL: null,
            firstName: null,
            lastName: null,
            department: null,
            jobTitle: null
        })
    }
    return userRef;
}

function* addEmployeeToCompany(employeeData, company) {
    try {
        const {id, email} = employeeData;
        const companyRef = yield firestore.doc(`companies/${company.id}`);
        yield companyRef.set({employees: {[id] : {email: email}}}, {merge: true})
    } catch (error) {
        console.log(error)
    }
}

function* signUpUser({payload: {email, password, company}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield createUserProfileDocument(user, email, company);
        const userSnapshot = yield userRef.get();
        const employeeData = yield userSnapshot.data();
        yield addEmployeeToCompany(employeeData, company)
        yield put(signUpUserSuccess(employeeData));
    } catch (error) {
        let message = ''
        if(error.message === "Password should be at least 6 characters") {
            message = error.message
        } else {
            console.log(error.message)
            message = "Something went wrong."
        }
       yield put(signUpUserFailure(message))
    }
}

function* onSignUpUserStart() {
    yield takeLatest(userActionTypes.SIGNUP_USER_START, signUpUser)
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) {
            return;
        }
        const userRef = yield createUserProfileDocument(userAuth);
        const userSnapshot = yield userRef.get();
        const employee = {...userSnapshot.data()}
        yield put(signInUserSuccess(employee))
    } catch (error) {
        yield put(signInUserFailure(error.message))
    }
}

function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess())
    } catch (error) {
        yield put(signOutUserFailure(error.message))
    }
}
function* onUserSignOutStart() {
    yield takeLatest(userActionTypes.SIGNOUT_USER_START, signOutUser)
}

function* signInWithEmail({payload: {email, password, company}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        console.log(company)
        if(company.employees[user.uid]) {
            const userRef = yield createUserProfileDocument(user, email, company);
            const userSnapshot = yield userRef.get();
            const employee = {...userSnapshot.data()}
            yield put(signInUserSuccess(employee))
        } else {
            yield put(signInUserFailure('User Does Not Exist'))
        }
    } catch (error) {
        yield put(signInUserFailure('User Does Not Exist'))
    }
}

function* onSignInUserStart() {
    yield takeLatest(userActionTypes.SIGNIN_USER_START, signInWithEmail)

}

function* updateUserProfile({payload: {currentUser, profileForm}}) {
    try {
        const userRef = yield firestore.doc(`users/${currentUser.id}`);
        yield userRef.update({
            firstTimeLogin: false,
            ...profileForm
        });
        const userSnapshot = yield userRef.get()
        const updatedUser = yield userSnapshot.data();
        yield put(updateProfileFormSuccess(updatedUser))
        yield put(updateCompanyStart(updatedUser))
    } catch (error) {
        yield put(updateProfileFormFailure(error.message))
    }

}

function* onUpdateProfileFormStart() {
    yield takeLatest(userActionTypes.UPDATE_PROFILEFORM_START, updateUserProfile)
}

function* userSagas() {
    yield all([call(onSignUpUserStart), 
               call(onCheckUserSession), 
               call(onUserSignOutStart),
               call(onSignInUserStart),
               call(onUpdateProfileFormStart)
            ])
}

export default userSagas;