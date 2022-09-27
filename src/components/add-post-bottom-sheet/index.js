/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import colors from 'src/utils/themes/global-colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import Photo from 'src/assets/svg/addPost/photo';
import Video from 'src/assets/svg/addPost/video';
import fonts from 'src/utils/themes/fonts';

const AddPostBottomSheet = ({onPhotoPress, onVideoPress}) => (
  <>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: heightPercentageToDP(1.5),
      }}
      onPress={onPhotoPress}>
      <Photo />
      <Text
        style={{
          color: colors.black,
          marginHorizontal: widthPercentageToDP(2),
          fontSize: RFValue(15),
          fontFamily: fonts.RobotoMedium,
        }}>
        Upload Photo
      </Text>
    </TouchableOpacity>
    <View
      style={{
        height: 0.5,
        width: '90%',
        backgroundColor: colors.grey,
        marginVertical: 20,
        opacity: 0.5,
        alignSelf: 'center',
      }}
    />
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
      }}
      onPress={onVideoPress}>
      <Video />
      <Text
        style={{
          color: colors.black,
          marginHorizontal: widthPercentageToDP(2),
          fontSize: RFValue(15),
          fontFamily: fonts.RobotoMedium,
        }}>
        Upload Video
      </Text>
    </TouchableOpacity>
  </>
);

export {AddPostBottomSheet};
