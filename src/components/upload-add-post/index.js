/* eslint-disable react/prop-types */
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import UploadButton from '../upload-button';

export default function UploadAddPost({
  onPressUpload,
  image,
  uploadImagetext,
  imageSize,
  imageBackGround,
}) {
  return (
    <>
      <ImageBackground style={styles.container} source={imageBackGround}>
        <Image source={image} />
        <Text style={styles.text}>{uploadImagetext}</Text>
        <Text style={styles.size}>{imageSize}</Text>
        <View style={styles.uploadbutton}>
          <UploadButton uploadText={'Upload'} onPressUpload={onPressUpload} />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 185,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.placeholderColor,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 20,
  },
  size: {
    fontWeight: 'bold',
    color: colors.placeholderColor,
    fontSize: 11,
  },
  uploadbutton: {
    marginTop: 18,
  },
});
