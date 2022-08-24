import client from '../client';
import {API_URLS} from '../url-paths';

const addPost = obj => {
  return client.post(API_URLS.ADD_POST, obj, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

const getAllMyPostApi = () => {
  return client.get(API_URLS.GET_MY_ALL_POSTS);
};

const getUsersAllPostApi = id => {
  return client.get(`${API_URLS.GET_USER_ALL_POSTS}${id}`);
};

const getHomeAllPostApi = (page, limit) => {
  return client.get(API_URLS.ALL_FEEDS, {
    params: {page: page, limit: limit},
  });
};

export const postServices = {
  addPost,
  getAllMyPostApi,
  getUsersAllPostApi,
  getHomeAllPostApi,
};
