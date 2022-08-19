/* eslint-disable react/prop-types */
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from 'src/utils/themes/global-colors';
import ActivityIndicator from '../loader/activity-indicator';

export default function BackgroundImageWithImage({
  imageBackGround,
  image,
  editImage,
  editBackGround,
  onPressProfileImage,
}) {
  const [profileLoader, setProfileLoader] = useState(false);
  const [coverLoader, setCoverLoader] = useState(false);

  return (
    <>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={'cover'}
        source={imageBackGround}
        // source={{uri: imageBackGround}}
        onLoadStart={() => setCoverLoader(true)}
        onLoadEnd={() => setCoverLoader(false)}>
        {editImage && (
          <>
            <ActivityIndicator fontSize={20} visible={coverLoader} />
            <TouchableOpacity style={styles.edit} onPress={editBackGround}>
              {/* <Image source={editImage} /> */}
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={styles.roundViewMain}
          onPress={onPressProfileImage}>
          <ActivityIndicator fontSize={20} visible={profileLoader} />
          <Image
            source={image}
            // source={{uri: image}}
            style={styles.roundView}
            onLoadStart={() => setProfileLoader(true)}
            onLoadEnd={() => setProfileLoader(false)}
          />
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
    borderWidth: 5,
    borderColor: colors.whiteColor,
  },
  edit: {
    alignSelf: 'flex-end',
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
});
