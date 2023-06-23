/* eslint-disable react/prop-types */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';

export default function Button({
  text,
  onPress,
  disabled,
  backgroundColor,
  loader,
}) {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: backgroundColor, flexDirection: 'row'},
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.buttonText}>{text}</Text>
        <View style={{marginLeft: 20}}>
          {loader && <ActivityIndicator color={colors.whiteColor} />}
        </View>
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
  },
  button: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 2,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: hp(1),
  },
});
