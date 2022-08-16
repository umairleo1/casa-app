import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';

import Settings from 'src/screens/main/settings';
import ProfileSetting from 'src/screens/main/settings/profile-settings';

import FindPeople from 'src/screens/main/find-people';
import Profile from 'src/screens/main/profile';
import BottomTab from 'src/screens/main/tab';

const Stack = createStackNavigator();
const {SETTING, PROFILE_SETTING, FIND_PEOPLE, PROFILE, BOTTOM_TAB} = SCREEN;

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={BOTTOM_TAB} component={BottomTab} />
      <Stack.Screen name={SETTING} component={Settings} />
      <Stack.Screen name={PROFILE_SETTING} component={ProfileSetting} />

      <Stack.Screen name={FIND_PEOPLE} component={FindPeople} />
      <Stack.Screen name={PROFILE} component={Profile} />
    </Stack.Navigator>
  );
}
