/* eslint-disable no-unused-vars */
import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindPeople from '../find-people';
import Profile from '../profile';
import {createStackNavigator} from '@react-navigation/stack';
import SCREEN from 'utils/constants';
import ViewProfile from '../view-profile';
import Notification from '../notification';
import Home from '../home';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {setUserProfile} from 'src/redux/profile/profile-actions';
import {profileServices} from 'src/services/profile-services';

import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import colors from 'src/utils/themes/global-colors';
import AuthContext from 'src/utils/auth-context';

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

      {/* <Stack.Screen name={'Profile'} component={Profile} /> */}
    </Stack.Navigator>
  );
};

export default function BottomTab() {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.auth?.userToken);
  const authContext = useContext(AuthContext);
  const getUserData = async () => {
    try {
      const result = await profileServices.getUserProfile(
        jwt_decode(userToken)?.userId,
      );
      // console.log('Here is the user', result);
      authContext.setUserData(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useState(() => {
    getUserData();
  }, []);

  function HomeScreen() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{textAlign: 'center', fontSize: 25}}>Coming Soon</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarActiveTintColor: colors.buttonColor,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Find People"
        component={Stacks}
        options={{
          tabBarLabel: 'Find People',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Post"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Add Post',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="pluscircle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ViewProfile}
        options={{
          // unmountOnBlur: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
