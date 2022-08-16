import axios from 'axios';
// import authStorage from './authStorage';

console.log('CONFIG', process.env.API_URL);
const request = axios.create({
  //   baseURL: 'http://3.142.47.134:3000/api/v1',
  baseURL: 'http://192.168.100.53:3000',
});

const onSuccess = function (response) {
  // console.log(response);
  return response.data;
};

const onError = function (error) {
  // console.error('Request Failed:', error);
  if (error.response) {
    // console.log(error.response);
    // Request was made but server responded with something
    // other than 2xx
    // console.error('Status:', error.response.status);
    // console.error('Data:', error.response.data);
    // console.error('Headers:', error.response.headers);
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
    // const user = await authStorage.getToken();
    // console.log(user, 'header');

    // config.headers['Authorization'] = 'user';
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGF3b29kIEphdmVlZCIsImVtYWlsIjoiZGF3b29kMWZmZHNmZmRzMjNAZ21haWwuY29tIiwiaWQiOiI2MThmOGZjNzhhYzAyYjQ2MjQ0OTEyZjMiLCJyb2xlIjoiSW52ZW50b3J5IE1hbmFnZXIiLCJtb2RlbCI6InVzZXJzIiwiaWF0IjoxNjM2Nzk4NDIwLCJleHAiOjE2MzkzOTA0MjB9.62sycGoNG2GE5WZ6TTONowiAOlxqZGeWP4SB_dPY6ho';
    return config;
  },
  error => Promise.reject(error),
);
export default request;
