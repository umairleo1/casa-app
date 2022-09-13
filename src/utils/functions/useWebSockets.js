/* eslint-disable no-unused-vars */
// ES6 import or TypeScript
import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';

export const useWebSockets = ({
  userId,
  enabled,
  onConnected,
  arrayOfOtherUsers,
  receiceMsg,
}) => {
  const ref = useRef();
  const roomDataIdRef = useRef();

  const send = msg => {
    ref.current.emit('message', {
      roomId: roomDataIdRef.current,
      messagePayload: msg,
    });
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
    socket.emit('create', {otherUserId: arrayOfOtherUsers});

    socket.on('connected', () => {
      if (onConnected) {
        onConnected();
      }
    });

    //When room is successfully created this event is lisitened
    socket.on('OnJoin', data => {
      console.log('Room Data ', data);
      // setRoomData(data.chatRoomId);
      roomDataIdRef.current = String(data.chatRoomId);
    });

    socket.on('new message', data => {
      console.log('Reply received ', data);
      receiceMsg(data);
    });

    socket.on('disconnect', () => {
      console.log('Someone else disconnected');
    });

    // socket.on('reconnect', () => {
    //   socket.emit('joinRoom', userId);
    // });

    ref.current = socket;

    return () => socket.disconnect();
  }, [userId]);

  return {
    send,
  };
};
