import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Background from 'src/components/background';
import {styles} from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignupForm from './signupForm';
import Login from '../login';
import colors from 'src/utils/themes/global-colors';

export default function Signup({navigation}) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Background
        heading="LOGO"
        title="Welcome to the Biggest Social Network in the World"
        description="We are the best and biggest social network with 5 billion active users
      all around the world.Share you thoughts, write blog posts,show your
      favourite music via Stopify,earn badges and much more!">
        <Tab.Navigator
          style={{marginTop: 20, bottom: 10}}
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
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
           
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('LOGIN')}>
                <Text style={styles.login}>Login</Text>
              </TouchableOpacity>
            </View>
            <SignupForm />
          </View>
        </ScrollView> */}
      </Background>
    </>
  );
}
