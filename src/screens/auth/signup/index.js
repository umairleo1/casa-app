import React from 'react';

import Background from 'src/components/background';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignupForm from './signupForm';
import Login from '../login';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';

export default function Signup() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Background
        image={images.appLogo}
        title="Welcome to a social networking app built for the community."
        description="We are a social networking app built for the collective community of people that are latino/a, hispanic, latinx, chicano, and so on.  Our main goal is toare, connect, and write about ideas that are centered in our individual, separate, and collective communities. Share your world with others as they share their world with you.">
        <Tab.Navigator
          style={{marginTop: 30}}
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          screenOptions={{
            tabBarStyle: {
              height: 50,
            },
            tabBarHideOnKeyboard: false,
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 17,
            },

            tabBarIndicatorStyle: {
              backgroundColor: colors.placeholderColor,
            },

            tabBarInactiveTintColor: colors.placeholderColor,
          }}>
          <Tab.Screen name="Sign Up" component={SignupForm} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      </Background>
    </>
  );
}
