import client from '../client';
import {API_URLS} from '../url-paths';

const getUserProfile = () => {
  return client.get(API_URLS.GET_PROFILE);
};
const getUserProfileById = id => {
  return client.get(`${API_URLS.GET_PROFILE}?id=${id}`);
};

const savePersonalInfo = (id, obj) => {
  return client.put(`${API_URLS.SAVE_PERSONAL_INFO}${id}`, obj);
};

const getFollowingApi = () => {
  return client.get(API_URLS.GET_FOLLOWING);
};

const getFollowersApi = (page, limit, id) => {
  return client.get(API_URLS.GET_FOLLOWERS, {params: {page, limit, id}});
};

const unFollowApiApi = id => {
  return client.put(`${API_URLS.UNFOLLOW}${id}`);
};

const removeFollowersApi = id => {
  return client.put(`${API_URLS.REMOVE_FOLLOWERS}${id}`);
};
const updateProfilePicture = (id, obj) => {
  return client.put(`${API_URLS.UPDATE_PROFILE_PICTURE}${id}`, obj);
};
const followTo = id => {
  return client.put(`${API_URLS.FOLLOW_TO}${id}`);
};

const getNotificationApi = (page, limit) => {
  return client.get(API_URLS.GET_NOTIFICATIONS, {params: {limit, page}});
};

const logoutApi = obj => {
  return client.post(API_URLS.LOGOUT, obj);
};

export const profileServices = {
  getUserProfileById,
  getUserProfile,
  savePersonalInfo,
  getFollowingApi,
  unFollowApiApi,
  getFollowersApi,
  removeFollowersApi,
  updateProfilePicture,
  followTo,
  getNotificationApi,
  logoutApi,
};
