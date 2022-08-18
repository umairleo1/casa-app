import {Text, View, Pressable, ScrollView} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Button from 'src/components/button';
import {Formik} from 'formik';
import * as Yup from 'yup';

import colors from 'src/utils/themes/global-colors';

import {showMessage} from 'react-native-flash-message';
import {userService} from 'src/services/auth-service';
import {useNavigation} from '@react-navigation/native';
import authStorage from 'utils/async-storage/index';

import {useDispatch, useSelector} from 'react-redux';
import {setUserReduxToken} from 'src/redux/auth/auth-actions';

// eslint-disable-next-line react/prop-types
export default function LoginForm() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [passwordVisible] = useState(true);

  const [isLoading, setIsLoading] = React.useState(false);
  const fcmToken = useSelector(state => state?.auth?.fcmToken);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const loginFormSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .required('Email is required')
          .email('Email format is incorrect'),
        password: Yup.string()
          .required('Password is required')
          .min(8)
          .matches(
            passwordRegex,
            'Atleast have one digit, one captial letter and one special character.',
          ),
      }),
    [],
  );

  const handleLogin = async value => {
    try {
      setIsLoading(true);
      const result = await userService.login({
        email: value.email,
        password: value.password,
        fcmToken,
      });

      dispatch(setUserReduxToken(result.token));
      authStorage.storeToken(result.token);
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
    <View style={{backgroundColor: 'transparent'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.text}>Login to your Account</Text>
        <View style={styles.borderLine} />
        <View style={styles.mainView}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={value => handleLogin(value)}
            validationSchema={loginFormSchema}>
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
                <Input
                  placeholder={'Your Password'}
                  secureTextEntry={passwordVisible}
                  value={values.password}
                  error={touched.password ? errors.password : ''}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  // eyeIcon={!passwordVisible ? 'eye' : 'eye-off'}
                  // onPressEye={() => setPasswordVisible(!passwordVisible)}
                />
                <View style={styles.forgotPasswordView}>
                  {/* <CheckBox
                    isChecked={checked}
                    onPress={() => setUnChecked(!checked)}
                    tc1="Remeber Me"
                  /> */}
                  <Pressable
                    onPress={() => navigation.navigate('FORGOT_PASSWORD')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </Pressable>
                </View>

                <View style={styles.buttonView}>
                  <Button
                    text="Login"
                    onPress={handleSubmit}
                    backgroundColor={colors.buttonColor}
                    loader={isLoading}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}
