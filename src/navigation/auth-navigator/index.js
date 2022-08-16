import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Splash from 'src/screens/auth/splash';
import Login from 'screens/auth/login';
import Signup from 'screens/auth/signup';
import ForgotPassword from 'src/screens/auth/forgotPassword';

const Stack = createStackNavigator();
const {LOGIN, SIGNUP, SPLASH, FORGOT_PASSWORD} = SCREEN;

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SPLASH} component={Splash} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
}
