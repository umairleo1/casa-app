import * as Actions from './constants';

export const setUserProfile = item => dispatch => {
  dispatch({
    type: Actions.SET_USER_PROFILE,
    payload: item,
  });
};
