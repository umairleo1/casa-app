/* eslint-disable no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useMemo} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import Background from 'src/components/background';
import Button from 'src/components/button';
import Input from 'src/components/textinput';
import {userService} from 'src/services/auth-service';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import * as Yup from 'yup';
import {styles} from './styles';

import {showMessage} from 'react-native-flash-message';

export default function ForgotPassword() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);

  const forgotPasswordSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .required('Email is required')
          .email('Email format is incorrect'),
      }),
    [],
  );

  const handleLogin = async email => {
    try {
      setIsLoading(true);
      await userService.forgotPassword(email);
      navigation.navigate('OTP', {mail: email.email});
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={images.background} style={{height: '100%'}}>
      <View style={[styles.view]}>
        <Image source={images.appLogo} style={styles.image} />
        <Text style={styles.text2}>
          Welcome to a social networking app built for the community
        </Text>
        <Text style={styles.text3}>
          We are a social networking app built for the collective community of
          people that are latino/a, hispanic, latinx, chicano, and so on. Our
          main goal is toare, connect, and write about ideas that are centered
          in our individual, separate, and collective communities. Share your
          world with others as they share their world with you.
        </Text>
      </View>

      <View style={styles.borderLine} />
      <View style={styles.inputView}>
        <View style={{marginHorizontal: 15, borderRadius: 3}}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={value => handleLogin(value)}
            validationSchema={forgotPasswordSchema}>
            {({
              handleSubmit,
              errors,
              handleChange,
              values,
              touched,
              setFieldTouched,
            }) => (
              <>
                <Input
                  placeholder={'Your Email'}
                  value={values.email}
                  error={touched.email ? errors.email : ''}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  type="email-address"
                />
                <View style={styles.buttonView}>
                  <Button
                    text="Forgot Password"
                    onPress={handleSubmit}
                    backgroundColor={colors.buttonColor}
                    loader={isLoading}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
}
