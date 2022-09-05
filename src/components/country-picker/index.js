/* eslint-disable react/prop-types */
import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CountryPicker, {DEFAULT_THEME} from 'react-native-country-picker-modal';

export default function CountryPickerModal({onSelect,countryText,countryCode}) {
  
  return (
    <>
      {/* {alert(JSON.stringify(value))} */}
      <View style={styles.mainView}>
      <CountryPicker
        withFlag={true}
        withCallingCode={true}
        // withCallingCode={true}
        withFlagButton
        countryCode={countryCode}
        containerButtonStyle={styles.pickerButtonStyle}
        onSelect={onSelect}
        theme={{
          ...DEFAULT_THEME,
          backgroundColor: colors.whiteColor,
          onBackgroundTextColor: colors.black,
          fontSize: 15,
        }}
        placeholder={'Select Country'}
        // onValueChange={(value)=>setValue(value)}
      />
     {countryText &&
          <Text style={styles.text}>
            {countryText}
          </Text>
        }     
         </View>
    </>
  );
}
const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    borderColor: colors.innerBorder,
    paddingHorizontal: wp(1),
    flexDirection: 'row',
    borderRadius: 2,
  },
  pickerButtonStyle: {
    // backgroundColor:'red',
    height: 40,
    padding: 5,
  },
  text: {
    alignSelf: 'center',
  },
});
