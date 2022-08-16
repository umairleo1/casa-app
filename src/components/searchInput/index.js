/* eslint-disable react/prop-types */
import {TextInput, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SearchInput({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  onChange,
  onBlur,
  icon,
  iconSize,
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
          placeholderTextColor={colors.black}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
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
