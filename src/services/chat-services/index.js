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

const editGroupApi = obj => {
  return client.put(API_URLS.EDIT_GROUP, obj);
};

const leaveGroupApi = id => {
  return client.post(API_URLS.LEAVE_GROUP, {roomId: id});
};

export const chatServices = {
  getConversatioApi,
  getChatListApi,
  createGroupApi,
  editGroupApi,
  getGroupChatListApi,
  leaveGroupApi,
};
