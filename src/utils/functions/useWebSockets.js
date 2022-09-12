/* eslint-disable no-unused-vars */
// ES6 import or TypeScript
import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';

export const useWebSockets = ({
  userId,
  enabled,
  onConnected,
  arrayOfOtherUsers,
}) => {
  //   const ref=useRef<SocketIOCient.Socket>();
  const ref = useRef();
  const [messages, setMessages] = useState([]);

  const send = (msg, senderId) => {
    ref.current.emit('message', {
      content: msg,
      senderId: senderId,
      userId,
      date: new Date(),
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

    socket.emit('identity', userId);

    //create chat
    socket.emit('create', {otherUserId: arrayOfOtherUsers});

    socket.on('connected', () => {
      if (onConnected) {
        onConnected();
      }
    });

    // socket.emit('message', msg => {
    //   setMessages(prev => prev.concat(msg));
    // });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    // socket.on('reconnect', () => {
    //   socket.emit('joinRoom', userId);
    // });

    ref.current = socket;

    return () => socket.disconnect();
  }, [enabled, userId]);

  return {
    send,
    messages,
  };
};
