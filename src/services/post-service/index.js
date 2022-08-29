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

const editPost = (id, obj) => {
  return client.put(`${API_URLS.ADD_POST}/${id}`, obj, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

const deletePostApi = id => {
  return client.delete(`${API_URLS.DELETE_POST}${id}`);
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

const addCommentApi = (id, obj) => {
  return client.post(`${API_URLS.ADD_COMMENT}${id}`, obj);
};

const likePostApi = id => {
  return client.post(`${API_URLS.LIKE_POST}${id}`);
};

const getPromoCodeApi = () => {
  return client.get(API_URLS.GET_PROMO);
};

export const postServices = {
  addPost,
  editPost,
  getAllMyPostApi,
  getUsersAllPostApi,
  getHomeAllPostApi,
  deletePostApi,
  addCommentApi,
  likePostApi,
  getPromoCodeApi,
};
