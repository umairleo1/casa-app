/* eslint-disable no-unused-vars */
// ES6 import or TypeScript
import {useEffect, useRef} from 'react';
import io from 'socket.io-client';
import {chatServices} from 'src/services/chat-services';

export const useGroupChat = ({
  userId,
  enabled,
  onConnected,
  arrayOfOtherUsers,
  receiveMsg,
  setConnected,
  getChatList,
  chatRoomId,
}) => {
  const ref = useRef();
  const roomDataIdRef = useRef();

  const send = msg => {
    ref.current.emit('groupMessage', {
      roomId: chatRoomId,
      messagePayload: msg,
    });
  };

  const getConversation = async (page, limit) => {
    try {
      const result = await chatServices.getConversatioApi(
        chatRoomId,
        page,
        limit,
      );
      console.log('Here is the conversation ', result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    //pass url of socket io connection same base url
    const socket = io('http://43.205.56.71:3000');

    //first we need to make room with user
    // socket.emit('joinRoom', userId);

    socket.emit('identity', {userId});

    //create chat
    socket.emit('subscribeGroup', {
      chatRoomId: chatRoomId,
      otherUserId: arrayOfOtherUsers,
    });

    socket.on('connected', () => {
      if (onConnected) {
        onConnected();
      }
    });

    //When room is successfully created this event is lisitened
    socket.on('OnJoin', data => {
      console.log('Room Data ', data);
      // setRoomData(data.chatRoomId);
      // roomDataIdRef.current = String(data.chatRoomId);
      setConnected(true);
    });

    socket.on('newMessageGroup', data => {
      console.log('Reply received ', data);
      receiveMsg(data);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    // socket.on('reconnect', () => {
    //   socket.emit('joinRoom', userId);
    // });

    ref.current = socket;

    return () => {
      socket.emit('markUnread', {roomId: roomDataIdRef.current}),
        socket.disconnect(),
        getChatList();
    };
  }, [userId]);

  return {
    send,
    getConversation,
  };
};
