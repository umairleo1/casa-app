/* eslint-disable react/prop-types */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import fonts from 'src/utils/themes/fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function SettingSection({
  rightIcon,
  name,
  leftIcon,
  rightIconSize,
  onPress,
  imgStyle,
}) {
  return (
    <TouchableOpacity style={styles.mainView} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.imgView}>
          <Image source={leftIcon} style={[styles.leftImage, imgStyle]} />
        </View>
        <View style={{width: '80%'}}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
      <SimpleLineIcons
        name={rightIcon}
        size={rightIconSize}
        color={colors.black}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imgView: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImage: {
    marginLeft: 10,
  },
  text: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.RobotoRegular,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
