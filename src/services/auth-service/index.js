import client from '../client';
import {API_URLS} from '../url-paths';

const signup = obj => {
  return client.post(API_URLS.SIGNUP, obj);
};

const login = obj => {
  return client.post(API_URLS.LOGIN, obj);
};

export const userService = {signup, login};
