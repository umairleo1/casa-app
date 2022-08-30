/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Header from 'src/components/headerView';
import {GiftedChat, Send, InputToolbar, Bubble} from 'react-native-gifted-chat';
import SendIcon from 'src/assets/svg/Common/left-arrow';

import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'src/utils/themes/global-colors';
import {useNavigation} from '@react-navigation/native';

export default function GiftedChats() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const MessengerBarContainer = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#F2F2F2',
          alignContent: 'center',
          justifyContent: 'center',
          borderWidth: 0,
          //   paddingTop: 6,
          marginHorizontal: 6,
          borderRadius: 32,
          borderTopColor: 'transparent',
        }}
      />
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#F2F2F2',
            borderBottomLeftRadius: 0,
          },
          right: {
            backgroundColor: colors.buttonColor,
            borderBottomEndRadius: 0,
          },
        }}
        textStyle={{
          right: {
            color: colors.whiteColor,
            fontSize: 14,
          },
          left: {
            color: colors.black,
            fontSize: 14,
          },
        }}
      />
    );
  };

  return (
    <Header
      heading={'Miguel Cardona'}
      rightImage={require('../../../../assets/images/findpeople/people2.png')}
      onPressBack={() => navigation.goBack()}>
      <GiftedChat
        messages={messages}
        alwaysShowSend={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={props => MessengerBarContainer(props)}
        renderBubble={props => renderBubble(props)}
        renderSend={props => {
          return (
            <Send {...props}>
              <TouchableOpacity
                onPress={messages => onSend(messages)}
                style={styles.sendBtn}>
                <SendIcon height={30} width={30} />
              </TouchableOpacity>
            </Send>
          );
        }}
      />
    </Header>
  );
}
