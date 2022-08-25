/* eslint-disable react/prop-types */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {NewChatIcon} from 'src/assets/svg/chat';

import colors from 'src/utils/themes/global-colors';
import MultiChat from 'assets/svg/Common/multiChat';

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
          <Feather
            name="settings"
            size={24}
            color={colors.black}
            onPress={onPress}
          />
        ) : newChatIcon ? (
          <NewChatIcon onPress={onPressNewChat} />
        ) : (
          <Text></Text>
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
