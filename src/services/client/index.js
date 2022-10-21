/* eslint-disable no-dupe-keys */
import axios from 'axios';
import asyncStorage from 'utils/async-storage/index';

const request = axios.create({
  // baseURL: 'https://localhost:3000/',
  baseURL: 'http://43.205.56.71:3000/',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
console.log('Check Env ', process.env.REACT_API_URL);
const onSuccess = function (response) {
  // console.log(response);
  return response.data;
};

const onError = function (error) {
  console.log('Request Failed:', error);
  if (error.response) {
    console.log(error.response);
  }

  return Promise.reject({
    errMsg: !error?.response
      ? 'Network Issue!'
      : error?.response?.data?.error
      ? error?.response?.data?.error
      : 'Server Error',
    status: error?.response?.status,
  });
};

request.interceptors.response.use(onSuccess, onError);

request.interceptors.request.use(
  async config => {
    // console.log(JSON.stringify(config, null, 2));
    const user = await asyncStorage.getToken();

    config.headers['x-auth-token'] = user;

    return config;
  },
  error => Promise.reject(error),
);
export default request;
