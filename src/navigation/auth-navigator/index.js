import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Login from 'screens/auth/login';
import Signup from 'screens/auth/signup';
import SignupForm from 'src/screens/auth/signup/signupForm';

const Stack = createStackNavigator();
const {LOGIN, SIGNUP, SIGNUPFORM} = SCREEN;

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={SIGNUPFORM} component={SignupForm} />
    </Stack.Navigator>
  );
}
