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
}) {
  return (
    <TouchableOpacity style={styles.mainView} onPress={onPress}>
      <View style={styles.view}>
        <Image source={leftIcon} style={styles.leftImage} />
        <Text style={styles.text}>{name}</Text>
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
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    marginLeft: 10,
  },
  text: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.RobotoRegular,
    marginLeft: 15,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
