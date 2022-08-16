import axios from 'axios';
import asyncStorage from 'utils/async-storage/index';

console.log('CONFIG', process.env.API_URL);
const request = axios.create({
  baseURL: 'http://192.168.100.53:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const onSuccess = function (response) {
  // console.log(response);
  return response.data;
};

const onError = function (error) {
  // console.error('Request Failed:', error);
  if (error.response) {
    // console.log(error.response);
  }

  return Promise.reject({
    errMsg: !error?.response ? 'Network Issue!' : error?.response?.data?.error,
    status: error?.response?.status,
  });
};

request.interceptors.response.use(onSuccess, onError);

request.interceptors.request.use(
  async config => {
    // console.log(JSON.stringify(config, null, 2));
    const user = await asyncStorage.getToken();

    config.headers['x-auth-token'] = user;
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGF3b29kIEphdmVlZCIsImVtYWlsIjoiZGF3b29kMWZmZHNmZmRzMjNAZ21haWwuY29tIiwiaWQiOiI2MThmOGZjNzhhYzAyYjQ2MjQ0OTEyZjMiLCJyb2xlIjoiSW52ZW50b3J5IE1hbmFnZXIiLCJtb2RlbCI6InVzZXJzIiwiaWF0IjoxNjM2Nzk4NDIwLCJleHAiOjE2MzkzOTA0MjB9.62sycGoNG2GE5WZ6TTONowiAOlxqZGeWP4SB_dPY6ho';
    return config;
  },
  error => Promise.reject(error),
);
export default request;
