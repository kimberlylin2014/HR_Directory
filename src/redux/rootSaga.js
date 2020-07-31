import { all, call } from 'redux-saga/effects';
import companySagas from './company/company.sagas';
import userSagas from './user/user.sagas';

function* rootSaga() {
    yield all([call(companySagas), call(userSagas)])
}


export default rootSaga;