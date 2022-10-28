import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Splash from 'src/screens/auth/splash';
import Login from 'screens/auth/login';
import Signup from 'screens/auth/signup';
import ForgotPassword from 'src/screens/auth/forgotPassword';
import Otp from 'src/screens/auth/otp';
import ResetPassword from 'src/screens/auth/resetPassword';
import MetaSignUP from 'src/screens/auth/signup/signupForm/signup-metamask';

const Stack = createStackNavigator();
const {LOGIN, SIGNUP, SPLASH, FORGOT_PASSWORD, OTP, RESET_PASSWORD} = SCREEN;

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
      <Stack.Screen name={'MetaSignUP'} component={MetaSignUP} />
      <Stack.Screen name={OTP} component={Otp} />
      <Stack.Screen name={RESET_PASSWORD} component={ResetPassword} />
    </Stack.Navigator>
  );
}
