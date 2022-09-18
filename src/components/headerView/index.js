/* eslint-disable react/prop-types */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NewChatIcon} from 'src/assets/svg/chat';

import colors from 'src/utils/themes/global-colors';
import MultiChat from 'assets/svg/Common/multiChat';
import fonts from 'src/utils/themes/fonts';

export default function Header({
  children,
  heading,
  onPress,
  feather,
  onPressBack,
  leftImage,
  rightIcon,
  onPressChat,
  newChatIcon,
  onPressNewChat,
  rightImage,
  onPressInbox,
  chatIcon,
  rightText,
  onPostPress,
  description,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        {leftImage ? (
          <Image source={leftImage} style={styles.image} />
        ) : (
          <AntDesign
            name="arrowleft"
            size={24}
            color={colors.black}
            onPress={onPressBack}
          />
        )}
        <Text style={styles.text}>{heading}</Text>

        {feather ? (
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name={chatIcon}
              size={24}
              color={colors.black}
              onPress={onPressInbox}
              style={{marginRight: 15}}
            />
            <Feather
              name="settings"
              size={24}
              color={colors.black}
              onPress={onPress}
            />
          </View>
        ) : // {feather ? (
        //   <>
        //    <Feather
        //     name="settings"
        //     size={24}
        //     color={colors.black}
        //     onPress={onPress}
        //   />
        //   </>

        newChatIcon ? (
          <NewChatIcon onPress={onPressNewChat} />
        ) : rightImage ? (
          <Image source={rightImage} style={styles.rightImage} />
        ) : (
          <TouchableOpacity
            disabled={description == '' ? true : false}
            onPress={onPostPress}>
            <Text
              style={{
                fontFamily: fonts.PoppinsBold,
                fontSize: 16,
                color:
                  description == '' ? colors.placeholderColor : colors.black,
              }}>
              {rightText}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && (
          <TouchableOpacity onPress={onPressChat}>
            <MultiChat />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}
