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
        {loder && <ActivityIndicator color={'#fff'} size={30} />}

        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    color: colors.whiteColor,

    fontFamily: fonts.RobotoRegular,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    height: 40,
    width: 100,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
