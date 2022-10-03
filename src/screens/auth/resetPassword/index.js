import {
  Keyboard,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useMemo} from 'react';
import Background from 'src/components/background';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Button from 'src/components/button';
import * as Yup from 'yup';
import colors from 'src/utils/themes/global-colors';
import {Formik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';

import {showMessage} from 'react-native-flash-message';
import {userService} from 'src/services/auth-service';
import images from 'src/assets/images';

export default function ResetPassword() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(true);

  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

  const resetPasswordSchema = useMemo(
    () =>
      Yup.object({
        password: Yup.string()
          .required('Password is required')
          .min(8)
          .matches(
            passwordRegex,
            'Atleast have one digit, one capital letter and one special character.',
          ),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .min(8)
          .when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'Both passwords must be same',
            ),
          }),
      }),
    [],
  );

  const handleReset = async value => {
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      await userService.resetPassword({
        otp: route.params.otp,
        userId: route.params.id,
        password: value.password,
      });
      showMessage({
        message: 'Password Changed Successfully',
        type: 'success',
      });
      navigation.navigate('SIGNUP');
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
      title="Welcome to the Biggest Social Network in the World"
      description="We are the best and biggest social network with 5 billion active users
      all around the world.Share you thoughts, write blog posts,show your
      favourite music via Stopify,earn badges and much more!">
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={styles.view}>
            <Text style={styles.resetPassword}>Reset Password</Text>
            <View style={styles.borderLine} />
            <View style={styles.inputView}>
              <Formik
                initialValues={{
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={value => handleReset(value)}
                validationSchema={resetPasswordSchema}>
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
                      placeholder={'New Password'}
                      secureTextEntry={passwordVisible}
                      value={values.password}
                      error={touched.password ? errors.password : ''}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      eyeIcon={!passwordVisible ? 'eye' : 'eye-off'}
                      onPressEye={() => setPasswordVisible(!passwordVisible)}
                    />
                    <Input
                      placeholder={'Confirm New Password'}
                      secureTextEntry={confirmPasswordVisible}
                      value={values.confirmPassword}
                      error={
                        touched.confirmPassword ? errors.confirmPassword : ''
                      }
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={() => setFieldTouched('confirmPassword')}
                      eyeIcon={!confirmPasswordVisible ? 'eye' : 'eye-off'}
                      onPressEye={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    />
                    <View style={styles.buttonView}>
                      <Button
                        text="Reset Password"
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
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  );
}
