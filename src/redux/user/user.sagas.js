import userActionTypes from './user.types';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { signUpUserSuccess, 
         signUpUserFailure, 
         signInUserSuccess, 
         signInUserFailure,
         signOutUserSuccess,
         signOutUserFailure 
        } from './user.actions';
import { firestore, auth, getCurrentUser } from '../../firebase/firebase.util';
import userReducer from './user.reducer';


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
            companyId: company.id
        })
    }
    return userRef;
}

function* addEmployeeToCompany(userObj, company) {
    try {
        const companyRef = yield firestore.doc(`companies/${company.id}`);
        const companySnapshot = yield companyRef.get();
        const {employees} = yield companySnapshot.data();
        yield companyRef.update("employees", [...employees, {...userObj}])
    } catch (error) {
        console.log(error)
    }
}

function* signUpUser({payload: {email, password, company}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield createUserProfileDocument(user, email, company);
        const userSnapshot = yield userRef.get();
        const employee = {...userSnapshot.data()}
        yield addEmployeeToCompany(employee, company)
        yield put(signUpUserSuccess(employee))
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
        console.log(error);
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
        const userRef = yield createUserProfileDocument(user, email, company);
        const userSnapshot = yield userRef.get();
        const employee = {...userSnapshot.data()}
        yield put(signInUserSuccess(employee))
    } catch (error) {
        yield put(signInUserFailure(error.message))
    }
}

function* onSignInUserStart() {
    yield takeLatest(userActionTypes.SIGNIN_USER_START, signInWithEmail)

}
function* userSagas() {
    yield all([call(onSignUpUserStart), 
               call(onCheckUserSession), 
               call(onUserSignOutStart),
               call(onSignInUserStart)
            ])
}

export default userSagas;