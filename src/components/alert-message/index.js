/* eslint-disable react/prop-types */
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export default function AlertMessage({visible = false, onPressYes, onPressNo}) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>Are You Sure ?</Text>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.yes} onPress={onPressYes}>
            <Text style={styles.yesText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressNo}
            style={[
              styles.yes,
              {
                backgroundColor: 'white',
                borderColor: colors.buttonColor,
                borderWidth: 1,
              },
            ]}>
            <Text style={[styles.yesText, {color: colors.buttonColor}]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 15,
  },
  yes: {
    backgroundColor: colors.buttonColor,
    width: widthPercentageToDP(20),
    alignItems: 'center',
    borderRadius: 3,
    padding: 5,
  },
  yesText: {
    color: colors.whiteColor,
  },
  text: {
    color: colors.buttonColor,
    fontWeight: 'bold',
    fontSize: RFValue(15),
    padding: 20,
  },
});
