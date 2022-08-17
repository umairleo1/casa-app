/* eslint-disable no-constant-condition */
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import asyncStorage from 'utils/async-storage/index';

import {useDispatch, useSelector} from 'react-redux';
import {setUserReduxToken} from 'src/redux/auth/auth-actions';

export default function CasaVerseNavigator() {
  const dispatch = useDispatch();

  const userToken = useSelector(state => state?.auth?.userToken);

  React.useEffect(() => {
    restoreToken();
  }, []);

  const restoreToken = async () => {
    const user = await asyncStorage.getToken();
    // console.log('here is the user token', user);
    if (user) dispatch(setUserReduxToken(user));
  };

  return (
    <>
      <NavigationContainer>
        {!userToken !== '' ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}
