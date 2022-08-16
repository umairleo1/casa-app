import {combineReducers} from 'redux';
import authReducers from '../auth/auth-reducers';

export const allReducers = combineReducers({auth: authReducers});
