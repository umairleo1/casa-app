/* eslint-disable react/prop-types */
import {TextInput, StyleSheet, View} from 'react-native';
import React from 'react';

export default function CommentBox({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  onChange,
  onBlur,
  placeholderTextColor,
  borderColor,
}) {
  return (
    <>
      {console.log('ccccc ', value)}
      <View style={styles.textAreaContainer}>
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, {borderColor: borderColor}]}
          placeholder={placeholder}
          onChangeText={value => onChangeText(value)}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          multiline={true}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    // justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    paddingLeft: 10,
    height: 100,
    textAlignVertical: 'top',
  },
});
