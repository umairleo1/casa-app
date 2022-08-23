import client from '../client';
import {API_URLS} from '../url-paths';

const addPost = obj => {
  return client.post(API_URLS.ADD_POST, obj);
};

export const postServices = {
  addPost,
};
