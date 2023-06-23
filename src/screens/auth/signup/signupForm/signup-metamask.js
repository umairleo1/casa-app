import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import Background from 'src/components/background';
import Button from 'src/components/button';
import Input from 'src/components/textinput';
import {userService} from 'src/services/auth-service';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import * as Yup from 'yup';
import {styles} from './styles';

import {showMessage} from 'react-native-flash-message';

import {useDispatch, useSelector} from 'react-redux';
import {setUserReduxToken} from 'src/redux/auth/auth-actions';

import asyncStorage from 'utils/async-storage/index';

export default function MetaSignUP({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(true);

  const fcmToken = useSelector(state => state?.auth?.fcmToken);

  const signupFormSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .min(3, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a first name that long')
          .required('First name is required'),
        lastName: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .min(3, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a last name that long')
          .required('Last name is required'),
        userName: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .min(3, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a user name that long')
          .required('User name is required'),
        inviteCode: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .required('Invite code is required'),

        email: Yup.string()
          .required('Email is required')
          .email('Email format is incorrect'),
        password: Yup.string()
          .required('Password is required')
          .min(8)
          .matches(
            passwordRegex,
            'Atleast have one digit, one capital letter and one special character.',
          ),
      }),
    [],
  );

  const handleSignup = async values => {
    try {
      setIsLoading(true);
      const signupData = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
        promoCode: values.inviteCode,
        publicAddress: route?.params?.publicAddress[0],
        fcmToken,
      };

      const result = await userService.signup(signupData);

      console.log(result);
      dispatch(setUserReduxToken(result.token));
      await asyncStorage.storeToken(result.token);
      await asyncStorage.storeFcmToken(fcmToken);
      showMessage({
        message: result.message,
        type: 'success',
      });
      // navigation.navigate('SIGNUP', {nav: true});
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      showMessage({
        message: error?.errMsg,
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Background
        image={images.appLogo}
        title="Welcome to a social networking app built for the community."
        // description="We are a social networking app built for the collective community of people that are latino/a, hispanic, latinx, chicano, and so on.  Our main goal is to share, connect, and write about ideas that are centered in our individual, separate, and collective communities. Share your world with others as they share their world with you."
      >
        <View style={[styles.mainView, {backgroundColor: '#fff', padding: 20}]}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              userName: '',
              email: '',
              password: '',
              inviteCode: '',
            }}
            onSubmit={values => handleSignup(values)}
            validationSchema={signupFormSchema}>
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
                  placeholder={'First Name'}
                  value={values.firstName}
                  error={touched.firstName ? errors.firstName : ''}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                />
                <Input
                  placeholder={'Last Name'}
                  value={values.lastName}
                  error={touched.lastName ? errors.lastName : ''}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                />
                <Input
                  placeholder={'User Name'}
                  value={values.userName}
                  error={touched.userName ? errors.userName : ''}
                  onChangeText={handleChange('userName')}
                  onBlur={() => setFieldTouched('userName')}
                />

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
                  eyeIcon={!passwordVisible ? 'eye' : 'eye-off'}
                  onPressEye={() => setPasswordVisible(!passwordVisible)}
                />

                <Input
                  placeholder={'Invitation Code'}
                  type="numeric"
                  maxLength={4}
                  value={values.inviteCode}
                  error={touched.inviteCode ? errors.inviteCode : ''}
                  onChangeText={handleChange('inviteCode')}
                  onBlur={() => setFieldTouched('inviteCode')}
                />

                <Button
                  loader={isLoading}
                  text="Complete Registration!"
                  onPress={handleSubmit}
                  backgroundColor={colors.buttonColor}
                />
              </>
            )}
          </Formik>
        </View>
      </Background>
    </>
  );
}
