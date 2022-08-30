/* eslint-disable no-unused-vars */
import React, {useState} from 'react';

import Background from 'src/components/background';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignupForm from './signupForm';
import Login from '../login';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

export default function Signup() {
  const Tab = createMaterialTopTabNavigator();
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <View>
      <Background
        image={images.appLogo}
        title="Welcome to a social networking app built for the community."
        description="We are a social networking app built for the collective community of people that are latino/a, hispanic, latinx, chicano, and so on.  Our main goal is to share, connect, and write about ideas that are centered in our individual, separate, and collective communities. Share your world with others as they share their world with you.">
        {/* <Tab.Navigator
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
        </Tab.Navigator> */}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 60,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#E6ECF5',
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor: '#E6ECF5',
            }}
            onPress={() => setShowSignUp(true)}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: showSignUp ? '#0A2540' : '#C0C4D8',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowSignUp(false)}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: !showSignUp ? '#0A2540' : '#C0C4D8',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        {showSignUp ? <SignupForm setShowSignUp={setShowSignUp} /> : <Login />}
      </Background>
    </View>
  );
}
