import {View} from 'react-native';
import React from 'react';
import Background from 'src/components/background';
import OtpInput from 'src/components/otpInput';
import Button from 'src/components/button';
import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import {useNavigation, useRoute} from '@react-navigation/native';

import {showMessage} from 'react-native-flash-message';
import {userService} from 'src/services/auth-service';
import images from 'src/assets/images';

export default function Otp() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setIsLoading] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [isClear, setisClear] = React.useState(false);

  const handleOtp = async () => {
    if (otp.length < 4) {
      showMessage({
        message: otp.length == 0 ? 'OTP is required' : 'invalid OTP length',
        type: 'danger',
      });
    } else {
      try {
        setIsLoading(true);
        const result = await userService.otpVerification({
          email: route?.params?.mail,
          otp: otp,
        });
        console.log(result);
        setisClear(true);
        setOtp('');
        navigation.navigate('RESET_PASSWORD', {id: result.userId, otp: otp});

        setIsLoading(false);
      } catch (error) {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Background
      image={images.appLogo}
      title="Welcome to the Biggest Social Network in the World"
      description="We are the best and biggest social network with 5 billion active users
      all around the world.Share you thoughts, write blog posts,show your
      favourite music via Stopify,earn badges and much more!">
      <View style={styles.view}>
        <OtpInput onCodeChange={setOtp} count={4} clear={isClear} />

        <View style={styles.buttonView}>
          <Button
            text="Reset Password"
            onPress={() => handleOtp()}
            backgroundColor={colors.buttonColor}
            loader={isLoading}
          />
        </View>
      </View>
    </Background>
  );
}
