import client from '../client';
import {API_URLS} from '../url-paths';

const getConversatioApi = id => {
  return client.get(`${API_URLS.GET_CONVERSATION}${id}`, {
    params: {page: 1, limit: 45},
  });
};

export const chatServices = {
  getConversatioApi,
};
