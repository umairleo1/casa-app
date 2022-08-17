import {View} from 'react-native';
import React from 'react';
import Background from 'src/components/background';
import OtpInput from 'src/components/otpInput';
import Button from 'src/components/button';
import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import {useNavigation} from '@react-navigation/native';

export default function Otp() {
  const navigation = useNavigation();
  return (
    <Background
      image={images.appLogo}
      title="Welcome to the Biggest Social Network in the World"
      description="We are the best and biggest social network with 5 billion active users
      all around the world.Share you thoughts, write blog posts,show your
      favourite music via Stopify,earn badges and much more!">
      <View style={styles.view}>
        <OtpInput count={4} />
        <View style={styles.buttonView}>
          <Button
            text="Reset Password"
            onPress={() => navigation.navigate('RESET_PASSWORD')}
            backgroundColor={colors.buttonColor}
          />
        </View>
      </View>
    </Background>
  );
}
