/* eslint-disable react/prop-types */
import {TextInput, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';

export default function Input({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  error,
  onChange,
  onBlur,
  type,
  editable,
}) {
  return (
    <>
      <TextInput
        placeholderTextColor={colors.placeholderColor}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onChange={onChange}
        value={value}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        keyboardType={type}
        autoCapitalize={type == 'email-address' ? 'none' : 'sentences'}
        editable={editable}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    borderColor: colors.innerBorder,
  },
  errorText: {
    color: colors.redColor,
    fontSize: 12,
  },
  errorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
