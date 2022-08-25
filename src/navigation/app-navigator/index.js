import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';

import Settings from 'src/screens/main/settings';
import ProfileSetting from 'src/screens/main/settings/profile-settings';
import FindPeople from 'src/screens/main/find-people';
import Profile from 'src/screens/main/profile';
import PromoCode from 'src/screens/main/promo-code';
import Comments from 'src/screens/main/home/comments';
import AddPost from 'src/screens/main/add-post';
import BottomTab from 'src/screens/main/tab';
import ChatTab from 'src/screens/main/chat-tab';
import NewChat from 'src/screens/main/chat-tab/new-chat';

const Stack = createStackNavigator();
const {
  SETTING,
  PROFILE_SETTING,
  FIND_PEOPLE,
  PROFILE,
  BOTTOM_TAB,
  PROMO_CODE,
  COMMENTS,
  ADD_POST,
  CHAT_TAB,
  NEW_CHAT,
} = SCREEN;

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
      <Stack.Screen name={PROMO_CODE} component={PromoCode} />
      <Stack.Screen name={COMMENTS} component={Comments} />
      <Stack.Screen name={ADD_POST} component={AddPost} />
      <Stack.Screen name={CHAT_TAB} component={ChatTab} />
      <Stack.Screen name={NEW_CHAT} component={NewChat} />
    </Stack.Navigator>
  );
}
