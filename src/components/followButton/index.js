/* eslint-disable react/prop-types */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';

export default function FollowButton({text, onPress, backgroundColor, loder}) {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor}]}
        onPress={onPress}
        disabled={loder}>
        {loder ? (
          <ActivityIndicator color={'#fff'} size={30} />
        ) : (
          <Text style={styles.buttonText}>{text}</Text>
        )}
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
    height: 40,
    width: 100,
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(1),
  },
});
