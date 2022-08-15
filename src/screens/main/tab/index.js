import {Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindPeople from '../find-people';
import Profile from '../profile';

export default function BottomTab() {
  const Tab = createBottomTabNavigator();

  function HomeScreen() {
    return <Text>homeeeeeeeeeeee</Text>;
  }

  function SettingsScreen() {
    return <Text>setingggggggggggg</Text>;
  }

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarIconStyle: {display: 'none'}}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Find People" component={FindPeople} />
      <Tab.Screen name="Add Post" component={HomeScreen} />
      <Tab.Screen name="Notification" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
