import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindPeople from '../find-people';
import Profile from '../profile';
import {createStackNavigator} from '@react-navigation/stack';
import SCREEN from 'utils/constants';
import ViewProfile from '../view-profile';

import asyncStorage from 'utils/async-storage/index';
import {useDispatch} from 'react-redux';
import {handleLogout} from 'src/redux/auth/auth-actions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Find" component={FindPeople} />
      <Stack.Screen name={SCREEN.VIEW_PROFILE} component={ViewProfile} />
    </Stack.Navigator>
  );
};

export default function BottomTab() {
  const dispatch = useDispatch();

  function HomeScreen() {
    return (
      <>
        <Text>homeeeeeeeeeeee</Text>
        <TouchableOpacity
          onPress={() => {
            asyncStorage.removeToken(), dispatch(handleLogout(''));
          }}
          style={{
            height: 50,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </>
    );
  }

  function SettingsScreen() {
    return <Text>setingggggggggggg</Text>;
  }

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarIconStyle: {display: 'none'}}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Find People" component={Stacks} />
      <Tab.Screen name="Add Post" component={HomeScreen} />
      <Tab.Screen name="Notification" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
