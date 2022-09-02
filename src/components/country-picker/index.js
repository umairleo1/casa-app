/* eslint-disable react/prop-types */
import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CountryPicker, {DEFAULT_THEME} from 'react-native-country-picker-modal';

export default function CountryPickerModal() {
  const [value, setValue] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('US');

  const onSelect = Country => {
    setCountryCode(Country.cca2);
    setValue(Country);
    // props.setSelectCountryCode(Country.callingCode[0]);
  };

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
          onSelect={Country => onSelect(Country)}
          theme={{
            ...DEFAULT_THEME,
            backgroundColor: colors.whiteColor,
            onBackgroundTextColor: colors.black,
            fontSize: 15,
          }}
          placeholder={'Select Country'}
          // onValueChange={(value)=>setValue(value)}
        />
        {value && <Text style={styles.text}>{value.name}</Text>}
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
