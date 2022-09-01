/* eslint-disable react/prop-types */
import {StyleSheet, View,Text} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CountryPicker,{DEFAULT_THEME} from 'react-native-country-picker-modal'


export default function CountryPickerModal() {
    const [value,setValue]=React.useState('');

  return (
    <>
    {/* {alert(JSON.stringify(value.name))} */}
      <View style={styles.mainView}>
      <CountryPicker
        withFlag={true}
        withFilter
        withCountryNameButton
        withCallingCode={true}
        containerButtonStyle={styles.pickerButtonStyle}
        onSelect={(Country) => setValue(Country)}
        theme={{
          ...DEFAULT_THEME,
          backgroundColor: colors.whiteColor,
          onBackgroundTextColor: colors.black,
          fontSize: 15,
        }}
        // placeholder={'Sélectionnez un pays'}
        // onValueChange={(value)=>setValue(value)}
      />
     {value &&
          <Text style={styles.text}>
            {(value.name)}
          </Text>
        }     
         </View>
    </>
  );
}
const styles = StyleSheet.create({

  mainView: {
    borderWidth:1,
    borderColor: colors.innerBorder,
    paddingHorizontal: wp(3),
    flexDirection:'row',
    borderRadius:2
  },
  pickerButtonStyle:{
    backgroundColor:'red',
    height:40,
  },
  text:{
   alignSelf:'center'    
  }
});
