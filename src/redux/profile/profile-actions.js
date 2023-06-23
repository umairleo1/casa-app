import * as Actions from './constants';

export const setUserProfile = item => dispatch => {
  console.log('item', item);
  dispatch({
    type: Actions.SET_USER_PROFILE,
    payload: item,
  });
};
