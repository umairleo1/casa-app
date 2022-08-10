import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import colors from 'utils/themes/global-colors';
import fonts from 'utils/themes/fonts';
import images from 'assets/images';
import SCREENS from 'utils/constants';

export default function Screen1() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={images.splash}
        style={{height: '30%', width: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.SCREEN2)}>
        <Text style={styles.text}>Welcome to Casa Verse 1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.RobotoRegular,
    color: colors.darkWhite,
  },
});
