import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import fonts from 'src/utils/themes/fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function SettingSection({
  rightIcon,
  name,
  leftIcon,
  rightIconSize,
}) {
  return (
    <View style={styles.mainView}>
      <View style={styles.view}>
        <Image source={leftIcon} style={styles.leftImage} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <SimpleLineIcons
        name={rightIcon}
        size={rightIconSize}
        color={colors.black}
      />
    </View>
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
