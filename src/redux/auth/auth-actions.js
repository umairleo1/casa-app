import * as Actions from './constants';

export const setUserReduxToken = item => dispatch => {
  dispatch({
    type: Actions.SET_TOKEN,
    payload: item,
  });
};

export const handleLogout = item => dispatch => {
  dispatch({
    type: Actions.LOGOUT,
    payload: item,
  });
};
