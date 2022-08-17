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
        title="Welcome to the Biggest Social Network in the World"
        description="We are the best and biggest social network with 5 billion active users all around the world.Share you thoughts, write blog posts,show your favourite music via Stopify,earn badges and much more!">
        <Tab.Navigator
          style={{marginTop: 30}}
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          screenOptions={{
            tabBarStyle: {
              height: 50,
            },
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
