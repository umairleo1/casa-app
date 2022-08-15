import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Signup from 'src/screens/auth/signup';
import Login from 'src/screens/auth/login';
import Settings from 'src/screens/main/settings';
import ProfileSetting from 'src/screens/main/settings/profile-settings';

const Stack = createStackNavigator();
const {SIGNUP, LOGIN, SETTING, PROFILE_SETTING} = SCREEN;

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SETTING} component={Settings} />
      <Stack.Screen name={PROFILE_SETTING} component={ProfileSetting} />
    </Stack.Navigator>
  );
}
