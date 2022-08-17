import {Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Background from 'src/components/background';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Button from 'src/components/button';
import * as Yup from 'yup';
import colors from 'src/utils/themes/global-colors';
import {Formik} from 'formik';
import images from 'src/assets/images';
import {useNavigation} from '@react-navigation/native';

export default function ResetPassword() {
  const navigation = useNavigation();
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
              'Both password shoul11 be the same',
            ),
          }),
      }),
    [],
  );

  const handleReset = () => {
    navigation.navigate('Login');
  };
  return (
    <Background
      image={images.appLogo}
      title="Welcome to the Biggest Social Network in the World"
      description="We are the best and biggest social network with 5 billion active users
      all around the world.Share you thoughts, write blog posts,show your
      favourite music via Stopify,earn badges and much more!">
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
