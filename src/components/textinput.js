import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';

export default function Input({
  onChangeText,
  text,
  placeholder,
  secureTextEntry,
}) {
  return (
    <>
      <TextInput
        placeholderTextColor={colors.placeholderColor}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={text}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    borderColor: colors.innerBorder,
  },
});
