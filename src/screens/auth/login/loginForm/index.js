import {Text, View, Pressable} from 'react-native';
import React, {useState, useMemo} from 'react';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Button from 'src/components/button';
import CheckBox from 'src/components/checkbox';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import colors from 'src/utils/themes/global-colors';

// eslint-disable-next-line react/prop-types
export default function LoginForm() {
  const [checked, setUnChecked] = useState(false);
  const navigation = useNavigation();

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

  return (
    <>
      <Text style={styles.text}>Login to your Account</Text>
      <View style={styles.borderLine} />
      <View style={styles.mainView}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={() => navigation.navigate('SETTING')}
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
              />
              <Input
                placeholder={'Your Password'}
                secureTextEntry={true}
                value={values.password}
                error={touched.password ? errors.password : ''}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              <View style={styles.forgotPasswordView}>
                <CheckBox
                  isChecked={checked}
                  onPress={() => setUnChecked(!checked)}
                  tc1="Remeber Me"
                />
                <Pressable>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable>
              </View>
              <Button
                text="Login"
                onPress={handleSubmit}
                disabled={!checked}
                backgroundColor={!checked ? colors.grey : colors.buttonColor}
              />
            </>
          )}
        </Formik>
      </View>
    </>
  );
}
