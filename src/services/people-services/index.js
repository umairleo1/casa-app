import client from '../client';
import {API_URLS} from '../url-paths';

const findPeopleApi = (search, page, limit) => {
  return client.get(API_URLS.FIND_PEOPLE, {
    params: {search: search, page: page, limit: limit},
  });
};

export const peopleServices = {findPeopleApi};
