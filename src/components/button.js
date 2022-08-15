import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';

export default function Button({text, onPress, disabled, backgroundColor}) {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor}]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(2),
    color: colors.whiteColor,
    lineHeight: hp(5),
    fontFamily: fonts.RobotoRegular,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    height: hp(7),
    // backgroundColor: colors.buttonColor,
    borderRadius: 2,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: hp(1),
  },
});
