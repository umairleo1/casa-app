import AsyncStorage from '@react-native-async-storage/async-storage';

const userToken = 'userToken';

const storeToken = async value => {
  //   console.log('ckeck ', value);
  try {
    const jsonObj = JSON.stringify(value);
    await AsyncStorage.setItem(userToken, jsonObj);
  } catch (e) {
    console.log('Error in storing user token', e);
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

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(userToken);
  } catch (error) {
    console.log('Error removing remember user', error);
  }
};

export default {
  removeToken,
  storeToken,
  getToken,
};
