/* eslint-disable no-constant-condition */
import React from 'react';
import {Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import asyncStorage from 'utils/async-storage/index';

import {useDispatch, useSelector} from 'react-redux';
import {setUserReduxToken} from 'src/redux/auth/auth-actions';

import messaging from '@react-native-firebase/messaging';
import {setFcmTokenRedux} from 'src/redux/auth/auth-actions';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function CasaVerseNavigator() {
  const dispatch = useDispatch();

  const userToken = useSelector(state => state?.auth?.userToken);

  React.useEffect(() => {
    restoreToken();
    requestUserPermission();

    const type = 'notification';
    Platform.OS == 'ios' &&
      PushNotificationIOS.addEventListener(type, onRemoteNotification);
    return () => {
      Platform.OS == 'ios' && PushNotificationIOS.removeEventListener(type);
    };
  }, []);

  const restoreToken = async () => {
    const user = await asyncStorage.getToken();
    // console.log('here is the user token', user);
    if (user) dispatch(setUserReduxToken(user));
  };

  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmTokenn = await messaging().getToken();
      dispatch(setFcmTokenRedux(fcmTokenn));
      console.log('Here is the fcm token ', Platform.OS, ' ', fcmTokenn);
    }
  }

  //Must be outside of any component LifeCycle (such as `componentDidMount`).
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function (token) {
    //   // console.log('TOKEN:', token);
    // },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // Platform.OS === 'android' &&
      PushNotification.localNotification({
        channelId: 'channel-id',
        foreground: false,
        userInteraction: true,
        autoCancel: true,
        // bigText: 'notification.data.body',
        title: notification.title,
        message: notification.message,
        // subText: 'notification.data.body',
        // actions: '["Yes", "No"]',
      });
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification?.action);
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'channel-id',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );

  // const ExampleSend = () => {
  //   PushNotification.localNotification({
  //     channelId: 'channel-id',
  //     foreground: false,
  //     userInteraction: true,
  //     autoCancel: true,
  //     // bigText: 'notification.data.body',
  //     title: 'Casa App',
  //     message: 'hello welcome to jamanji',
  //     // subText: 'notification.data.body',
  //     // actions: '["Yes", "No"]',
  //   });
  //   // PushNotificationIOS.addNotificationRequest({
  //   //   id: 'channel-id',
  //   //   title: 'Notification',
  //   // });
  // };

  return (
    <>
      <NavigationContainer>
        {userToken !== '' ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      {/* <TouchableOpacity onPress={() => ExampleSend()}>
        <Text>gbf gf</Text>
      </TouchableOpacity> */}
    </>
  );
}
