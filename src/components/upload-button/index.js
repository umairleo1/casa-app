/* eslint-disable react/prop-types */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';

export default function UploadButton({uploadText, onPressUpload}) {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPressUpload}>
        <Text style={styles.text}>{uploadText}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.buttonColor,
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 11,
  },
});
