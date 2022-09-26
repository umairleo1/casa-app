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

const getGroupChatListApi = search => {
  return client.get(API_URLS.GET_GROUP_CHAT_LIST, {
    params: {search: search},
  });
};

const createGroupApi = obj => {
  return client.post(API_URLS.CREATE_GROUP, obj);
};

export const chatServices = {
  getConversatioApi,
  getChatListApi,
  createGroupApi,
  getGroupChatListApi,
};
