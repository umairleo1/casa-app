import {Formik} from 'formik';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Background from 'src/components/background';
import Button from 'src/components/button';
import Input from 'src/components/textinput';
import colors from 'src/utils/themes/global-colors';
import {styles} from './styles';

export default function ForgotPassword() {
  return (
    <Background
      heading="LOGO"
      title="Welcome to the Biggest Social Network in the World"
      description="We are the best and biggest social network with 5 billion active users
all around the world.Share you thoughts, write blog posts,show your
favourite music via Stopify,earn badges and much more!">
      <View style={styles.mainView}>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
        <View style={styles.borderLine} />
        <View style={styles.inputView}>
          <Input
            placeholder={'Your Email'}
            // value={values.email}
            // error={touched.email ? errors.email : ''}
            // onChangeText={handleChange('email')}
            // onBlur={() => setFieldTouched('email')}
            type="email-address"
          />
          <View style={styles.buttonView}>
            <Button
              text="Forgot Password"
              // onPress={handleSubmit}
              // disabled={!checked}
              backgroundColor={colors.buttonColor}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}
