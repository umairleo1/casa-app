import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Signup from 'src/screens/auth/signup';
import Login from 'src/screens/auth/login';
const Stack = createStackNavigator();
const {SIGNUP, LOGIN} = SCREEN;

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={LOGIN} component={Login} />
    </Stack.Navigator>
  );
}
