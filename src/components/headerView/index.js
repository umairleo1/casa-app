/* eslint-disable react/prop-types */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {NewChatIcon} from 'src/assets/svg/chat';

import colors from 'src/utils/themes/global-colors';
import MultiChat from 'assets/svg/Common/multiChat';
import fonts from 'src/utils/themes/fonts';
import AuthContext from 'src/utils/auth-context';

import Settings from 'src/assets/svg/settings/settings';

export default function Header({
  children,
  heading,
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
  addPost,
  description,
  userId,
}) {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.headerView, {height: leftImage ? 90 : 60}]}>
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

            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => navigation.navigate('SETTING')}>
              {authContext?.userData?.user?._id ==
                (userId || authContext?.userData?.user?._id) && (
                <Settings
                  color={colors?.placeholderColor}
                  height={19}
                  width={19}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : newChatIcon ? (
          <NewChatIcon onPress={onPressNewChat} />
        ) : rightImage ? (
          <Image source={rightImage} style={styles.rightImage} />
        ) : (
          <TouchableOpacity
            disabled={addPost?.length > 0 || description != '' ? false : true}
            onPress={onPostPress}>
            <Text
              style={{
                fontFamily: fonts.PoppinsBold,
                fontSize: 16,
                color:
                  addPost?.length > 0 || description != ''
                    ? colors.black
                    : colors.placeholderColor,
              }}>
              {rightText}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && (
          <View style={{padding: 10, flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 10}} onPress={onPressChat}>
              <MultiChat
                color={colors?.placeholderColor}
                height={20}
                width={20}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SETTING')}>
              <Settings
                color={colors?.placeholderColor}
                height={19}
                width={19}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}
