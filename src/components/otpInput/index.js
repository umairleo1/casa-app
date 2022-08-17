/* eslint-disable react/prop-types */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import colors from 'src/utils/themes/global-colors';

export default function OtpInput({count, code, onCodeChange}) {
  return (
    <View style={styles.mainView}>
      <OTPInputView
        style={{width: '100%', height: 200}}
        pinCount={count}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => onCodeChange(code)}
        placeholderCharacter={'0'}
        placeholderTextColor={styles.placeholderTextColor}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 50,
    backgroundColor: 'red',
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'black',
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'red',
  },
  mainView: {
    borderRadius: 3,
    marginHorizontal: 15,
  },
  placeholderTextColor: {
    color: colors.placeholderColor,
  },
});
