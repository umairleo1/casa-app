/* eslint-disable react/prop-types */
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export default function BottomSheetButton({text, image, onPress}) {
  return (
    <TouchableOpacity style={styles.view} onPress={onPress}>
      <Image source={image} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginHorizontal: wp(3),
    color: colors.black,
  },
  view: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    paddingVertical: hp(0.8),
    paddingBottom: 10,
  },
});
