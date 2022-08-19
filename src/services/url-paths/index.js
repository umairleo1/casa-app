const API_URLS = {
  //Auth constants
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  FORGOT_PASSWORD: '/api/auth/forget-password',
  OTP_VERIFICATION: '/api/auth/otp-varification',
  RESET_PASSWORD: '/api/auth/password-reset',
  LOGOUT: '/api/auth/logout',

  //Find People
  FIND_PEOPLE: '/api/people/find-people',

  //Profile
  GET_PROFILE: '/api/profile/getUserProfile/',
  SAVE_PERSONAL_INFO: '/api/profile/updatePersonalInfo/',
  GET_FOLLOWING: '/api/following/following',
  UNFOLLOW: 'api/following/unfollow/',
  GET_FOLLOWERS: 'api/following/followers',
  REMOVE_FOLLOWERS: 'api/following/remove/follower/',
  UPDATE_PROFILE_PICTURE: 'api/profile/updateProfilePicture/',
  FOLLOW_TO: 'api/following/follow/',
  GET_NOTIFICATIONS: '/api/notification',
};

export {API_URLS};
