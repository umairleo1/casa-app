/* eslint-disable react/prop-types */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';

export default function RemoveButton({
  text,
  onPress,
  disabled,
  backgroundColor,
}) {
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
    color: colors.pureBlack,
    fontFamily: fonts.RobotoRegular,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
});
