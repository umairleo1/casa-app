import {Keyboard, Text, View} from 'react-native';
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

export default function ResetPassword() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setIsLoading] = React.useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const resetPasswordSchema = useMemo(
    () =>
      Yup.object({
        password: Yup.string()
          .required('Password is required')
          .min(8)
          .matches(
            passwordRegex,
            'Atleast have one digit, one captial letter and one special character.',
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
  };
  return (
    <Background
      heading="LOGO"
      title="Welcome to the Biggest Social Network in the World">
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
                  secureTextEntry={true}
                  value={values.password}
                  error={touched.password ? errors.password : ''}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                <Input
                  placeholder={'Confirm New Password'}
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  error={touched.confirmPassword ? errors.confirmPassword : ''}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
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
    </Background>
  );
}
