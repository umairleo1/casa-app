/* eslint-disable react/prop-types */
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OtpInput from 'src/components/otpInput';
import colors from 'src/utils/themes/global-colors';
import Button from '../button';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const PromoCodeModal = ({
  visible = false,
  iconPress,
  onCodeChange,
  onPress,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={'close'}
        size={28}
        style={{position: 'absolute', right: 20, top: 20}}
        onPress={iconPress}
        color={'white'}
      />
      <View style={styles.view}>
        <Text style={styles.text}>Promo Code</Text>
        <OtpInput onCodeChange={onCodeChange} count={4} />

        <View style={styles.buttonView}>
          <Button
            text="Done"
            onPress={onPress}
            backgroundColor={colors.buttonColor}
          />
        </View>
      </View>
    </View>
  );
};

export {PromoCodeModal};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: `rgba(0, 0, 0, 0.7)`,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 100,
    height: Dimensions.get('screen').height,
  },
  view: {
    backgroundColor: colors.whiteColor,
    borderRadius: 3,
    marginHorizontal: 15,
  },
  buttonView: {
    marginHorizontal: 15,
  },
  text: {
    fontSize: RFValue(18),
    color: colors.buttonColor,
    fontWeight: 'bold',
    marginLeft: widthPercentageToDP(3),
    top: heightPercentageToDP(2),
  },
});
