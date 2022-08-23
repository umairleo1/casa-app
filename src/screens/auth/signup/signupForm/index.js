import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Button from 'src/components/button';
import Datepicker from 'src/components/datePicker';
import moment from 'moment';
import {Formik} from 'formik';
import * as Yup from 'yup';
import colors from 'src/utils/themes/global-colors';
import {userService} from 'src/services/auth-service';
import {useNavigation} from '@react-navigation/native';

import {showMessage} from 'react-native-flash-message';

export default function SignupForm() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const navigation = useNavigation();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const signupFormSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
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

  const handleSignup = async values => {
    if (selectedDate == '') {
      showMessage({
        message: 'Dob must not be empty',
        type: 'danger',
      });
    } else {
      try {
        setIsLoading(true);
        const result = await userService.signup({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          dob: moment(selectedDate).format('YYYY-MM-DD'),
          gender: values.gender,
        });

        showMessage({
          message: result.message,
          type: 'success',
        });
        navigation.navigate('Login');
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <View style={{backgroundColor: 'transparent'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <Text style={styles.text}>Register to Casa App</Text>
            <View style={styles.borderLine} />
            <View style={styles.mainView}>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  birthDate: '',
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
                    <Datepicker
                      handleConfirm={handleConfirm}
                      hideDatePicker={hideDatePicker}
                      showDatePicker={showDatePicker}
                      isVisible={isDatePickerVisible}
                      date={` ${
                        selectedDate
                          ? moment(selectedDate).format('MM/DD/YYYY')
                          : 'Your Birthday'
                      }`}
                      placeholder={!selectedDate}
                      error={touched.birthDate ? errors.birthDate : ''}
                    />
                    {/* <Dropdown
                      selectedValue={values.gender}
                      onValueChange={handleChange('gender')}
                      error={touched.gender ? errors.gender : ''}
                    /> */}

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
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
}
