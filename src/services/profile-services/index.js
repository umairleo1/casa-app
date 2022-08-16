import client from '../client';
import {API_URLS} from '../url-paths';

const getUserProfile = id => {
  return client.get(`${API_URLS.GET_PROFILE}${id}`);
};

const savePersonalInfo = (id, obj) => {
  return client.put(`${API_URLS.SAVE_PERSONAL_INFO}${id}`, obj);
};

export const profileServices = {getUserProfile, savePersonalInfo};
