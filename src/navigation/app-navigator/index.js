import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Signup from 'src/screens/auth/signup';
import Login from 'src/screens/auth/login';
import Settings from 'src/screens/main/settings';
import ProfileSetting from 'src/screens/main/settings/profile-settings';
import Splash from 'src/screens/auth/splash';
import ForgotPassword from 'src/screens/auth/forgotPassword';
import FindPeople from 'src/screens/main/find-people';
import Profile from 'src/screens/main/profile';
import BottomTab from 'src/screens/main/tab';
import ViewProfile from 'src/screens/main/view-profile';

const Stack = createStackNavigator();
const {
  SIGNUP,
  LOGIN,
  SETTING,
  PROFILE_SETTING,
  SPLASH,
  FORGOT_PASSWORD,
  FIND_PEOPLE,
  PROFILE,
  BOTTOM_TAB,
  VIEW_PROFILE,
} = SCREEN;

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name={VIEW_PROFILE} component={ViewProfile} /> */}
      <Stack.Screen name={SPLASH} component={Splash} />
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={BOTTOM_TAB} component={BottomTab} />
      <Stack.Screen name={SETTING} component={Settings} />
      <Stack.Screen name={PROFILE_SETTING} component={ProfileSetting} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={FIND_PEOPLE} component={FindPeople} />
      <Stack.Screen name={PROFILE} component={Profile} />
    </Stack.Navigator>
  );
}
