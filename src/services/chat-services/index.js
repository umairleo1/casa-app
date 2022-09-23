import client from '../client';
import {API_URLS} from '../url-paths';

const getConversatioApi = (id, page, limit) => {
  return client.get(`${API_URLS.GET_CONVERSATION}${id}`, {
    params: {page: page, limit: limit},
  });
};

const getChatListApi = search => {
  return client.get(API_URLS.GET_CHAT_LIST, {
    params: {search: search},
  });
};

export const chatServices = {
  getConversatioApi,
  getChatListApi,
};
