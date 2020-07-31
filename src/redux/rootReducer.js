import { combineReducers } from 'redux';
import companyReducer from './company/company.reducer';
import userReducer from './user/user.reducer';


const rootReducer = combineReducers({
    company: companyReducer,
    user: userReducer
});

export default rootReducer;