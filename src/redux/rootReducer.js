import { combineReducers } from 'redux';
import companyReducer from './company/company.reducer';
import userReducer from './user/user.reducer';

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'company']
}

const rootReducer = combineReducers({
    company: companyReducer,
    user: userReducer
});

export default persistReducer(persistConfig, rootReducer);