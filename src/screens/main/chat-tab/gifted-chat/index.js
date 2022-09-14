/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Header from 'src/components/headerView';
import {GiftedChat, Send, InputToolbar, Bubble} from 'react-native-gifted-chat';
import SendIcon from 'src/assets/svg/Common/left-arrow';

import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'src/utils/themes/global-colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useWebSockets} from 'src/utils/functions/useWebSockets';
import AuthContext from 'src/utils/auth-context';
import {useRef} from 'react';

export default function GiftedChats() {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef();
  const [message, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (connected) {
      var temp = [];
      getConversation().then(value =>
        value?.conversation?.map(item => {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
              {
                _id: item?._id,
                text: item?.message,
                createdAt: item?.createdAt,
                user: {
                  _id: item?.postedByUser,
                  name:
                    route?.params?.data?.user?.firstName +
                    ' ' +
                    route?.params?.data?.user?.lastName,
                  avatar: route?.params?.data?.user?.profileImage,
                },
              },
            ]),
          );

          // temp.push({
          //   _id: item?._id,
          //   text: item?.message,
          //   createdAt: item?.createdAt,
          //   user: {
          //     _id: item?.postedByUser,
          //     name:
          //       route?.params?.data?.user?.firstName +
          //       ' ' +
          //       route?.params?.data?.user?.lastName,
          //     avatar: route?.params?.data?.user?.profileImage,
          //   },
          // });
        }),
      );

      // setMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, temp),
      // );
    }
  }, [connected]);

  const scrollToBottom = id => {
    // console.log('Message changed');
    // setTimeout(() => {
    //   ref.current.scrollToBottom({animated: true});
    // }, 2000);
  };

  const receiveMsg = message => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: message?.post?._id,
          text: message?.post?.message,
          createdAt: message?.post?.createdAt,
          user: {
            _id: message?.post?.postedByUser,
            name:
              route?.params?.data?.user?.firstName +
              ' ' +
              route?.params?.data?.user?.lastName,
            avatar: route?.params?.data?.user?.profileImage,
          },
        },
      ]),
    );
  };

  const {send, getConversation} = useWebSockets({
    userId: authContext?.userData?.user?._id,
    arrayOfOtherUsers: [route?.params?.userId],
    enabled: Boolean(authContext?.userData?.user?._id),
    onConnected: scrollToBottom,
    receiveMsg: receiveMsg,
    setConnected,
  });

  const onSend = useCallback((messages = []) => {
    //we are receiving out own message thats why we comment this
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
    send(messages[0]?.text);
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
          marginBottom: 2,
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
      heading={
        route?.params?.data?.user?.firstName +
        ' ' +
        route?.params?.data?.user?.lastName
      }
      rightImage={{uri: route?.params?.data?.user?.profileImage}}
      onPressBack={() => navigation.goBack()}>
      <GiftedChat
        messages={message}
        alwaysShowSend={true}
        onSend={messages => {
          onSend(messages), console.log('messages ', message);
        }}
        user={{
          _id: authContext.userData?.user?._id,
        }}
        renderInputToolbar={props => MessengerBarContainer(props)}
        renderBubble={props => renderBubble(props)}
        // loadEarlier={true}
        // isLoadingEarlier={true}
        renderLoading={() => (
          <ActivityIndicator
            style={{position: 'absolute', zIndex: 200}}
            size="large"
            color="#0000ff"
          />
        )}
        scrollToBottom
        isAnimated
        showAvatarForEveryMessage={true}
        isInitialized={false}
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
