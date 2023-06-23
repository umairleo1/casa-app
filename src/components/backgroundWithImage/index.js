/* eslint-disable react/prop-types */
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import colors from 'src/utils/themes/global-colors';
import ActivityIndicator from '../loader/activity-indicator';
import images from '../../assets/images/index';
import {EditIcon} from 'src/assets/svg/profile-settings';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export default function BackgroundImageWithImage({
  imageBackGround,
  image,
  editImage,
  editBackGround,
  onPressProfileImage,
  onPressZoomProfile,
  onPressBackgroundZoom,
  showEdit,
}) {
  const [profileLoader, setProfileLoader] = useState(false);
  const [coverLoader, setCoverLoader] = useState(false);

  return (
    <>
      <Pressable onPress={onPressBackgroundZoom}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode={'cover'}
          source={imageBackGround ? {uri: imageBackGround} : images.background}
          onLoadStart={() => setCoverLoader(true)}
          onLoadEnd={() => setCoverLoader(false)}>
          {editImage && (
            <>
              <ActivityIndicator fontSize={20} visible={coverLoader} />
              <TouchableOpacity style={styles.edit} onPress={editBackGround}>
                <EditIcon />
                {/* <Image source={editImage} /> */}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={[styles.roundViewMain, {overflow: 'hidden'}]}
            onPress={onPressZoomProfile}>
            <ActivityIndicator fontSize={20} visible={profileLoader} />
            <Image
              source={image ? {uri: image} : images.people}
              style={styles.roundView}
              // resizeMode="stretch"
              onLoadStart={() => setProfileLoader(true)}
              onLoadEnd={() => setProfileLoader(false)}
            />
          </TouchableOpacity>
        </ImageBackground>
      </Pressable>
      {showEdit && (
        <TouchableOpacity
          style={styles.profilePicIcon}
          onPress={onPressProfileImage}>
          <EditIcon />
        </TouchableOpacity>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    backgroundColor: 'grey',
  },
  roundView: {
    borderRadius: 100,
    borderWidth: 2,
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
    // borderWidth: 5,
    borderColor: colors.whiteColor,
  },
  edit: {
    alignSelf: 'flex-end',
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
  profilePicIcon: {
    width: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: widthPercentageToDP(25),
    marginTop: heightPercentageToDP(1),
    // position: 'absolute',
  },
});
