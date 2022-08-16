import {combineReducers} from 'redux';
import authReducers from '../auth/auth-reducers';
import profileReducers from '../profile/profile-reducers';

export const allReducers = combineReducers({
  auth: authReducers,
  profile: profileReducers,
});
