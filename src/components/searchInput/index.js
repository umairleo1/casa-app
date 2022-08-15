import {TextInput, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

export default function SearchInput({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  onChange,
  onBlur,
  icon,
  iconSize,
  editIcon,
  editIconSize,
  placeholderTextColor,
}) {
  return (
    <>
      <View style={styles.searchView}>
        <AntDesign
          name={icon}
          size={iconSize}
          color={colors.black}
          style={{padding: 10, marginLeft: 10}}
        />
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
        />
        <Feather
          name={editIcon}
          size={editIconSize}
          color={colors.placeholderColor}
          style={{padding: 10, marginLeft: 10}}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    fontSize: 16,
    height: 40,
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.innerBorder,
    borderWidth: 1,
    borderRadius: 2,
  },
});
