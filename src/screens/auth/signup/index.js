import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Background from 'src/components/background';
import {styles} from './styles';
import SignupForm from './signupForm';

export default function Signup() {
  return (
    <>
      <Background
        heading="LOGO"
        title="Welcome to the Biggest Social Network in the World"
        description="We are the best and biggest social network with 5 billion active users
      all around the world.Share you thoughts, write blog posts,show your
      favourite music via Stopify,earn badges and much more!">
        <View style={styles.mainView}>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signup}>Login</Text>
            </TouchableOpacity>
          </View>

          <SignupForm />
        </View>
      </Background>
    </>
  );
}
