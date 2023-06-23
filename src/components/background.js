/* eslint-disable react/prop-types */
import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import images from 'src/assets/images';
import colors from 'src/utils/themes/global-colors';
import fonts from 'src/utils/themes/fonts';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// eslint-disable-next-line react/prop-types
export default function Background({children, image, title, description}) {
  return (
    <ImageBackground source={images.background} style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={[styles.view]}>
          <Image source={image} style={styles.image} />
          <Text style={styles.text2}>{title}</Text>
          <Text style={styles.text3}>{description}</Text>
        </View>
        {children}
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  view: {
    marginHorizontal: 20,
  },
  image: {
    height: 50,
    width: 120,
  },
  text2: {
    fontSize: hp(3),
    fontFamily: fonts.RobotoRegular,
    color: colors.whiteColor,
    marginTop: 20,
    lineHeight: 30,
  },
  text3: {
    fontSize: hp(2),
    color: colors.whiteColor,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: fonts.RobotoRegular,
  },
});
