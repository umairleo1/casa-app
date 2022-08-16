/* eslint-disable react/prop-types */
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';

export default function CheckBox({isChecked, onPress, tc1, tc2, tc3}) {
  const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color={colors.black}
          />
        </Pressable>
        <View style={styles.view}>
          <Text style={styles.title}>{tc1}</Text>
          <Text style={styles.title2}>{tc2}</Text>
          <Text style={styles.title}>{tc3}</Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(1),
  },
  title: {
    fontSize: wp(3),
    color: colors.placeholderColor,
    marginLeft: 5,
    lineHeight: hp(5),
    fontFamily: fonts.RobotoRegular,
  },
  title2: {
    fontSize: wp(3),
    color: colors.pureBlack,
    marginLeft: 5,
    lineHeight: hp(5),
    fontFamily: fonts.RobotoRegular,
  },
  view: {
    flexDirection: 'row',
  },
  forgotPassword: {
    color: colors.black,
    fontSize: hp(1.8),
    lineHeight: 16,
  },
});
