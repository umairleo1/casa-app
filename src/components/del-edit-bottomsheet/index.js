/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'src/utils/themes/global-colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const CommentsBottomSheet = ({onPressEdit, onPressDel}) => (
  <>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: heightPercentageToDP(1.5),
      }}
      onPress={onPressEdit}>
      <Feather name="edit" color="black" size={20} />
      <Text
        style={{
          color: colors.black,
          marginHorizontal: widthPercentageToDP(2),
          fontSize: RFValue(15),
          flex: 1,
        }}>
        Edit
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: heightPercentageToDP(1.5),
      }}
      onPress={onPressDel}>
      <AntDesign name="delete" color="black" size={20} />
      <Text
        style={{
          color: colors.black,
          marginHorizontal: widthPercentageToDP(2),
          fontSize: RFValue(15),
          flex: 1,
        }}>
        Delete
      </Text>
    </TouchableOpacity>
  </>
);

export {CommentsBottomSheet};
