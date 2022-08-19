import {AuthState} from './auth-states';
import * as Actions from './constants';

const INITIAL_STATE = new AuthState();

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_TOKEN: {
      return {
        ...state,
        userToken: action.payload,
      };
    }
    case Actions.SET_FCM_TOKEN: {
      return {
        ...state,
        fcmToken: action.payload,
      };
    }

    case Actions.LOGOUT: {
      return {
        ...state,
        userToken: action.payload,
      };
    }

    default:
      return state;
  }
}
