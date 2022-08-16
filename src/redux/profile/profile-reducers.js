import {ProfileState} from './profile-states';
import * as Actions from './constants';

const INITIAL_STATE = new ProfileState();

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }

    default:
      return state;
  }
}
