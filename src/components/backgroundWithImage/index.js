/* eslint-disable react/prop-types */
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';

export default function BackgroundImageWithImage({
  imageBackGround,
  image,
  editImage,
  editBackGround,
  onPressProfileImage,
}) {
  return (
    <>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={'stretch'}
        source={imageBackGround}>
        {editImage && (
          <TouchableOpacity style={styles.edit} onPress={editBackGround}>
            <Image source={editImage} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.roundViewMain}
          onPress={onPressProfileImage}>
          <Image source={image} style={styles.roundView} />
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
  },
  roundView: {
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.whiteColor,
    width: 113,
    height: 113,
    zIndex: 1,

    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  roundViewMain: {
    borderRadius: 100,
    width: 113,
    height: 113,
    zIndex: 1,
    bottom: '-30%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  edit: {
    alignSelf: 'flex-end',
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
});
