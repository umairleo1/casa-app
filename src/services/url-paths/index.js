const API_URLS = {
  //Auth constants
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',

  //Find People
  FIND_PEOPLE: '/api/people/find-people',

  //Profile
  GET_PROFILE: '/api/profile/getUserProfile/',
  SAVE_PERSONAL_INFO: '/api/profile/updatePersonalInfo/',
  GET_FOLLOWING: '/api/following/following',
  UNFOLLOW: 'api/following/unfollow/',
  GET_FOLLOWERS: 'api/following/followers',
  REMOVE_FOLLOWERS: 'api/following/unfollow/follower/',
};

export {API_URLS};
