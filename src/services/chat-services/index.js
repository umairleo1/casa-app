import client from '../client';
import {API_URLS} from '../url-paths';

const getConversatioApi = (id, page, limit) => {
  return client.get(`${API_URLS.GET_CONVERSATION}${id}`, {
    params: {page: page, limit: limit},
  });
};

const getChatListApi = () => {
  return client.get(API_URLS.GET_CHAT_LIST);
};

export const chatServices = {
  getConversatioApi,
  getChatListApi,
};
