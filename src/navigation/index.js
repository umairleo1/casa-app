/* eslint-disable no-constant-condition */
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

export default function CasaVerseNavigator() {
  return (
    <>
      <NavigationContainer>
        {false ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </>
  );
}
