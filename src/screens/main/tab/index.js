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
import AddPost from '../add-post';
import {
  AddIcon,
  FindPeopleIcon,
  HomeIcon,
  NotificationIcon,
  ProfileIcon,
} from 'src/assets/svg/bottomTab';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {setUserProfile} from 'src/redux/profile/profile-actions';
import {profileServices} from 'src/services/profile-services';

import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import colors from 'src/utils/themes/global-colors';
import AuthContext from 'src/utils/auth-context';
import {useNavigation} from '@react-navigation/native';
import Comments from '../home/comments';
import Likes from '../home/likes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FindPeopleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN.SEARCH_PEOPLE} component={FindPeople} />
      <Stack.Screen name={SCREEN.VIEW_PROFILE} component={ViewProfile} />
      <Stack.Screen name={SCREEN.USER_PROFILE} component={ViewProfile} />
      {/* <Stack.Screen name={SCREEN.VIEW_PROFILE} component={ViewProfile} /> */}
      <Stack.Screen name={SCREEN.COMMENTS} component={Comments} />
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={SCREEN.LIKES} component={Likes} />
    </Stack.Navigator>
  );
};

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen name={SCREEN.VIEW_PROFILE} component={ViewProfile} />
      <Stack.Screen name={SCREEN.COMMENTS} component={Comments} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN.USER_PROFILE} component={ViewProfile} />

      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'ADD_POST'} component={AddPost} />
      <Stack.Screen name={SCREEN.COMMENTS} component={Comments} />
      <Stack.Screen name={SCREEN.LIKES} component={Likes} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN.HOME} component={Home} />
      <Stack.Screen name={SCREEN.USER_PROFILE} component={ViewProfile} />
      <Stack.Screen name={SCREEN.ADD_POST} component={AddPost} />
      <Stack.Screen name={SCREEN.COMMENTS} component={Comments} />
      <Stack.Screen name={SCREEN.LIKES} component={Likes} />
    </Stack.Navigator>
  );
};

export default function BottomTab() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: false,
        tabBarActiveTintColor: colors.buttonColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <HomeIcon color={focused ? colors.buttonColor : '#BBBBBB'} />
          ),
        }}
      />
      <Tab.Screen
        name="Find People"
        component={FindPeopleStack}
        options={{
          tabBarLabel: 'Mi Gente',
          tabBarIcon: ({color, size, focused}) => (
            <FindPeopleIcon color={focused ? colors.buttonColor : '#BBBBBB'} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Post"
        component={AddPost}
        options={{
          tabBarLabel: 'Add Post',
          tabBarIcon: ({color, size, focused}) => (
            <AddIcon color={focused ? colors.buttonColor : '#BBBBBB'} />

            // <AntDesign name="pluscircle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size, focused}) => (
            <NotificationIcon
              color={focused ? colors.buttonColor : '#BBBBBB'}
            />
            // <FontAwesome name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          unmountOnBlur: true,

          tabBarLabel: 'Profile',

          tabBarIcon: ({color, size, focused}) => (
            <ProfileIcon color={focused ? colors.buttonColor : '#BBBBBB'} />
            // <Ionicons name="person" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: ({preventDefault}) => {
            preventDefault();
            navigation.navigate('Profile', {id: undefined});
          },
        }}
      />
    </Tab.Navigator>
  );
}
