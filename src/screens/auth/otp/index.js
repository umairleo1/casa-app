import {Text, View} from 'react-native';
import React from 'react';
import Background from 'src/components/background';
import OtpInput from 'src/components/otpInput';
import Button from 'src/components/button';
import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import {useNavigation} from '@react-navigation/native';

export default function Otp() {
  const navigation = useNavigation();
  return (
    <Background
      heading="LOGO"
      title="Welcome to the Biggest Social Network in the World">
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
