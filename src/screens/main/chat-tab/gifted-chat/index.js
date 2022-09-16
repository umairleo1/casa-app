/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Header from 'src/components/headerView';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Bubble,
  Composer,
} from 'react-native-gifted-chat';
import SendIcon from 'src/assets/svg/Common/left-arrow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'src/utils/themes/global-colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useWebSockets} from 'src/utils/functions/useWebSockets';
import AuthContext from 'src/utils/auth-context';
import {useRef} from 'react';
import Emoji from 'src/components/emoji';
import images from 'src/assets/images';

export default function GiftedChats() {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef();
  const [message, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [messageText, setMessageText] = useState('');
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (connected) {
      var temp = [];
      getConversation(1, 100).then(value =>
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
        }),
      );
    }
  }, [connected]);

  const scrollToBottom = id => {
    // console.log('Message changed');
    // setTimeout(() => {
    //   ref.current.scrollToBottom({animated: true});
    // }, 2000);
  };

  const receiveMsg = message => {
    {
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
    }
  };

  const {send, getConversation} = useWebSockets({
    userId: authContext?.userData?.user?._id,
    arrayOfOtherUsers: [route?.params?.userId],
    enabled: Boolean(authContext?.userData?.user?._id),
    onConnected: scrollToBottom,
    receiveMsg: receiveMsg,
    setConnected,
    getChatList: route?.params?.getChatList,
  });

  const onSend = useCallback((messages = []) => {
    //we are receiving out own message thats why we comment this
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
    send(messages[0]?.text);
    setMessageText('');
  }, []);

  const loadMoreMessages = () => {};

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
      rightImage={
        route?.params?.data?.user?.profileImage
          ? {uri: route?.params?.data?.user?.profileImage}
          : images.people
      }
      onPressBack={() => navigation.goBack()}>
      <GiftedChat
        messages={message}
        alwaysShowSend={true}
        onSend={messages => {
          onSend(messages);
        }}
        user={{
          _id: authContext.userData?.user?._id,
        }}
        text={messageText}
        textInputProps={{
          onFocus: () => setShowEmoji(false),
          onChangeText: text => {
            setMessageText(text);
          },
        }}
        renderInputToolbar={props => MessengerBarContainer(props)}
        renderBubble={props => renderBubble(props)}
        // loadEarlier={true}
        // isLoadingEarlier={true}
        // renderChatEmpty={() => (
        //   <ActivityIndicator size="large" color="#0000ff" />
        // )}
        scrollToBottom
        isAnimated
        showAvatarForEveryMessage={true}
        isInitialized={false}
        listViewProps={{
          onEndReachedThreshold: 0.3, // When the top of the content is within 3/10 of the visible length of the content
          onEndReached: () => loadMoreMessages(),
        }}
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
        renderComposer={props => {
          return (
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
              }}>
              <Composer {...props} />
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss(), setShowEmoji(!showEmoji);
                }}>
                <Icon
                  size={18}
                  name={showEmoji ? 'close' : 'sticker-emoji'}
                  color={colors.placeholderColor}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {showEmoji && <Emoji setMessageText={setMessageText} />}
    </Header>
  );
}
