import client from '../client';
import {API_URLS} from '../url-paths';

const getUserProfile = id => {
  console.log('id', id);
  return client.get(`${API_URLS.GET_PROFILE + '?id='}${id}`);
};

const savePersonalInfo = (id, obj) => {
  return client.put(`${API_URLS.SAVE_PERSONAL_INFO}${id}`, obj);
};

const getFollowingApi = () => {
  return client.get(API_URLS.GET_FOLLOWING);
};

const getFollowersApi = () => {
  return client.get(API_URLS.GET_FOLLOWERS);
};

const unFollowApiApi = id => {
  return client.put(`${API_URLS.UNFOLLOW}${id}`);
};

const removeFollowersApi = id => {
  return client.put(`${API_URLS.REMOVE_FOLLOWERS}${id}`);
};

export const profileServices = {
  getUserProfile,
  savePersonalInfo,
  getFollowingApi,
  unFollowApiApi,
  getFollowersApi,
  removeFollowersApi,
};
