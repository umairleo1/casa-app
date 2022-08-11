import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import {Picker} from '@react-native-picker/picker';

export default function Dropdown({selectedValue, onValueChange}) {
  return (
    <>
      <View style={styles.pickerView}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={onValueChange}>
          <Picker.Item
            label="Your Gender"
            value=""
            style={{color: colors.placeholderColor, fontSize: 15}}
          />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  picker: {
    height: 40,
  },
  pickerView: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.innerBorder,
    marginTop: 12,
  },
});
