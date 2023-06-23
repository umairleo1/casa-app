import React from 'react';
import {View, StyleSheet} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import colors from 'src/utils/themes/global-colors';

// You can import from local files
export default function CustomPicker({options, defaultValue, onSelect}) {
  return (
    <View style={styles.container}>
      <ModalDropdown
        options={options}
        defaultValue={defaultValue}
        onSelect={onSelect}
        dropdownStyle={{width: '80%'}}
        style={{
          padding: 5,
          borderColor: colors.placeholderColor,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
