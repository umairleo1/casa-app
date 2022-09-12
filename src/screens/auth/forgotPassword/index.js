import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
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

  const handleForgot = async email => {
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
    <Background
      image={images.appLogo}
      title="Welcome to a social networking app built for the community."
      description="We are a social networking app built for the collective community of people that are latino/a, hispanic, latinx, chicano, and so on.  Our main goal is to share, connect, and write about ideas that are centered in our individual, separate, and collective communities. Share your world with others as they share their world with you.">
      <View style={styles.mainView}>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
        <View style={styles.borderLine} />
        <View style={styles.inputView}>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(value, {resetForm}) => {
              handleForgot(value), resetForm({values: ''});
            }}
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
    </Background>
  );
}
