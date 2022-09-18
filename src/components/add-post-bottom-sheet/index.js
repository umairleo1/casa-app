/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import colors from 'src/utils/themes/global-colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

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
      <FontAwesome name="photo" color="black" size={20} />
      <Text
        style={{
          color: colors.black,
          marginHorizontal: widthPercentageToDP(2),
          fontSize: RFValue(15),
          flex: 1,
        }}>
        Upload Photo
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: heightPercentageToDP(1.5),
      }}
      onPress={onVideoPress}>
      <Feather name="video" color="black" size={20} />
      <Text
        style={{
          color: colors.black,
          marginHorizontal: widthPercentageToDP(2),
          fontSize: RFValue(15),
          flex: 1,
        }}>
        Upload Video
      </Text>
    </TouchableOpacity>
  </>
);

export {AddPostBottomSheet};
