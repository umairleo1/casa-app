/* eslint-disable react/prop-types */
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from 'src/assets/images';
import colors from 'src/utils/themes/global-colors';
import fonts from 'src/utils/themes/fonts';

export default function Background({children, heading, title, description}) {
  return (
    <ImageBackground source={images.background} style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>{heading}</Text>
        <Text style={styles.text2}>{title}</Text>
        <Text style={styles.text3}>{description}</Text>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 22,
    // fontFamily: fonts.Montserrat,
    color: colors.whiteColor,
    marginTop: 20,
  },
  text2: {
    fontSize: 22,
    fontFamily: fonts.RobotoRegular,
    color: colors.whiteColor,
    marginTop: 30,
    lineHeight: 30,
  },
  text3: {
    fontSize: 12,
    color: colors.whiteColor,
    marginTop: 30,
    fontFamily: fonts.RobotoRegular,
    lineHeight: 16,
  },
});
