/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Header from 'src/components/headerView';
import {GiftedChat, Send, InputToolbar, Bubble} from 'react-native-gifted-chat';
import SendIcon from 'src/assets/svg/Common/left-arrow';

import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'src/utils/themes/global-colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useWebSockets} from 'src/utils/functions/useWebSockets';
import AuthContext from 'src/utils/auth-context';

export default function GiftedChats() {
  const navigation = useNavigation();
  const route = useRoute();
  const [message, setMessages] = useState([]);
  const authContext = React.useContext(AuthContext);
  const ref = useRef();

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
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    console.log('Message changed');
    // setTimeout(() => {
    //   ref.current.scrollToBottom({animated: true});
    // }, 2000);
  };

  const {messages, send} = useWebSockets({
    userId: authContext?.userData?.user?._id,
    arrayOfOtherUsers: [route?.params?.userId],
    enabled: Boolean(authContext?.userData?.user?._id),
    onConnected: scrollToBottom,
  });

  const onSend = useCallback((messages = []) => {
    console.log('Check messages ', messages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    // send(message[0]?.text, message.user?._id);
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
        messages={message}
        alwaysShowSend={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: authContext.userData?.user?._id,
        }}
        renderInputToolbar={props => MessengerBarContainer(props)}
        renderBubble={props => renderBubble(props)}
        renderSend={props => {
          return (
            <Send {...props}>
              <TouchableOpacity
                // onPress={messages => onSend(messages)}
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
