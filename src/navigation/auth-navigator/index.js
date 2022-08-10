import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Login from 'screens/auth/login';
import Signup from 'screens/auth/signup';

const Stack = createStackNavigator();
const {LOGIN, SIGNUP} = SCREEN;

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGNUP} component={Signup} />
    </Stack.Navigator>
  );
}
