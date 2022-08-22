/* eslint-disable react/prop-types */
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
  onPress,
  editable,
  editIconColor,
  borderColor,
  disableColor,
}) {
  return (
    <>
      <View style={[styles.searchView, {borderColor: borderColor}]}>
        {icon && (
          <AntDesign
            name={icon}
            size={iconSize}
            color={colors.black}
            style={{padding: 10, marginLeft: 10}}
          />
        )}
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, {color: disableColor}]}
          placeholder={placeholder}
          onChangeText={value => onChangeText(value)}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          editable={editable}
        />
        <Feather
          name={editIcon}
          size={editIconSize}
          color={editIconColor}
          style={{padding: 10, marginLeft: 10}}
          onPress={onPress}
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
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    height: 40,
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
  },
});
