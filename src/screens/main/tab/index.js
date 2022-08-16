import {Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindPeople from '../find-people';
import Profile from '../profile';
import {createStackNavigator} from '@react-navigation/stack';
import SCREEN from 'utils/constants';
import ViewProfile from '../view-profile';

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
      <Tab.Screen name="Find People" component={Stacks} />
      <Tab.Screen name="Add Post" component={HomeScreen} />
      <Tab.Screen name="Notification" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
