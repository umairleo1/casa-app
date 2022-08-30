import AsyncStorage from '@react-native-async-storage/async-storage';

const userToken = 'userToken';
const fcmTokem = 'fcmToken';

const storeToken = async value => {
  try {
    const jsonObj = JSON.stringify(value);
    await AsyncStorage.setItem(userToken, jsonObj);
    console.log('User Token stored ', value);
  } catch (e) {
    console.log('Error in storing user token', e);
  }
};

const storeFcmToken = async value => {
  try {
    const jsonObj = JSON.stringify(value);
    await AsyncStorage.setItem(fcmTokem, jsonObj);
  } catch (e) {
    console.log('Error in storing fcm token', e);
  }
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(userToken);
    if (value !== null) {
      const jsonVal = JSON.parse(value);
      return jsonVal;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error in getting remember user', e);
  }
};

const getfcmToken = async () => {
  try {
    const value = await AsyncStorage.getItem(fcmTokem);
    if (value !== null) {
      const jsonVal = JSON.parse(value);
      return jsonVal;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error in getting remember user', e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(userToken);
  } catch (error) {
    console.log('Error removing remember user', error);
  }
};

const removeFcmToken = async () => {
  try {
    await AsyncStorage.removeItem(fcmTokem);
  } catch (error) {
    console.log('Error removing fcm token', error);
  }
};

export default {
  removeToken,
  storeToken,
  getToken,
  getfcmToken,
  storeFcmToken,
  removeFcmToken,
};
